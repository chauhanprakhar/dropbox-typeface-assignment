import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import SearchBar from './components/SearchBar';
import RecentFiles from './components/RecentFiles';
import FileGrid from './components/FileGrid';
import UploadModal from './components/UploadModal';
import FilePreviewModal from './components/FilePreviewModal';
import ErrorModal from './components/ErrorModal';
import { listFiles, uploadFile, downloadFile } from './api';

const RECENT_FILES_KEY = 'recentlyOpenedFiles';
// sample user details
const username = 'testuser';
const password = 'testpass'

const fileTypeMatch = {
  documents: file => file.mimeType === 'application/pdf' || file.ext === 'pdf',
  photos: file => file.mimeType === 'image/jpeg' || file.mimeType === 'image/png' || file.ext === 'jpg' || file.ext === 'jpeg' || file.ext === 'png',
  gifs: file => file.mimeType === 'image/gif' || file.ext === 'gif',
  mp3: file => file.mimeType === 'audio/mp3' || file.mimeType === 'audio/mpeg' || file.ext === 'mp3',
};

// Sidebar and quick filter label maps
const sidebarLabels = {
  home: 'Home',
  documents: 'Documents (PDFs)',
  photos: 'Photos (JPG/PNG)',
  gifs: 'GIFs',
  mp3: 'MP3',
};
const quickFilterLabels = {
  home: 'All',
  documents: 'Documents (PDFs)',
  photos: 'Photos (JPG/PNG)',
  gifs: 'GIFs',
  mp3: 'MP3',
};

function App() {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [currentView, setCurrentView] = useState('home');
  const [files, setFiles] = useState([]);
  const [trashFiles, setTrashFiles] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  const [previewBlobUrl, setPreviewBlobUrl] = useState(null);
  const [recentFiles, setRecentFiles] = useState([]);
  const [quickFilter, setQuickFilter] = useState('home');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function fetchFiles() {
      setLoading(true); 
      const res = await listFiles();
      if (res.success) setFiles(res.data);
      else if (res.message) setError(res.message);
      setLoading(false);
    }
    fetchFiles();
    // Load recent files from localStorage
    const stored = localStorage.getItem(RECENT_FILES_KEY);
    if (stored) {
      setRecentFiles(JSON.parse(stored));
    }
  }, []);

  const handleDeleteFile = (fileName) => {
    setFiles(prev => prev.filter(f => f.originalName !== fileName));
    const deleted = files.find(f => f.originalName === fileName);
    if (deleted) setTrashFiles(prev => [...prev, deleted]);
  };

  const handleSidebarClick = (view) => {
    setCurrentView(view);
    setQuickFilter('home');
  };

  const handleUpload = async (selectedFiles) => {
    for (const file of selectedFiles) {
      const res = await uploadFile({ file, username, password });
      if (!res.success && res.message) {
        setError(res.message);
        return;
      }
    }
    const res = await listFiles();
    if (res.success) setFiles(res.data);
    else if (res.message) setError(res.message);
  };

  const handlePreview = async (file) => {
    if (!file.mimeType || (!file.mimeType.startsWith('image/') && file.mimeType !== 'application/pdf')) return;
    const blob = await downloadFile(file._id);
    const url = window.URL.createObjectURL(blob);
    setPreviewFile({ ...file, blobUrl: url });
    setPreviewBlobUrl(url);
    // Update recently opened files in localStorage
    let updated = [file, ...recentFiles.filter(f => f._id !== file._id)];
    if (updated.length > 8) updated = updated.slice(0, 8);
    setRecentFiles(updated);
    localStorage.setItem(RECENT_FILES_KEY, JSON.stringify(updated));
  };

  const handleClosePreview = () => {
    if (previewBlobUrl) window.URL.revokeObjectURL(previewBlobUrl);
    setPreviewFile(null);
    setPreviewBlobUrl(null);
  };

  const handleDownloadPreview = () => {
    if (previewFile && previewFile.blobUrl) {
      const a = document.createElement('a');
      a.href = previewFile.blobUrl;
      a.download = previewFile.originalName || previewFile.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };

  const handleClearRecent = () => {
    setRecentFiles([]);
    localStorage.removeItem(RECENT_FILES_KEY);
  };

  // Filtering logic
  let filteredFiles = (currentView === 'trash' ? trashFiles : files).filter(f =>
    (f.originalName || f.name).toLowerCase().includes(search.toLowerCase())
  );

  // Sidebar filter (not home)
  if (currentView !== 'home') {
    filteredFiles = filteredFiles.filter(fileTypeMatch[currentView] || (() => true));
  }

  // Quick filter (only in home)
  if (currentView === 'home' && quickFilter !== 'home') {
    filteredFiles = filteredFiles.filter(fileTypeMatch[quickFilter] || (() => true));
  }

  return (
    <div className="app-root">
      <Sidebar currentView={currentView} onNavigate={handleSidebarClick} />
      <div className="main-content">
        <Topbar
          onUploadClick={() => setUploadOpen(true)}
          title={currentView === 'home' ? quickFilterLabels[quickFilter] : sidebarLabels[currentView] || 'Home'}
        />
        <SearchBar value={search} onChange={e => setSearch(e.target.value)} />
        <RecentFiles recentFiles={recentFiles} onClear={handleClearRecent} />
        {
          loading ? (
            <div className="loader-container">
              <div className="loader"></div>
              <div>Loading files...</div>
            </div>
          ) :  <FileGrid
          files={filteredFiles}
          onDelete={currentView !== 'trash' ? handleDeleteFile : undefined}
          isTrash={currentView === 'trash'}
          onPreview={handlePreview}
          showQuickFilters={currentView === 'home'}
          quickFilter={quickFilter}
          onQuickFilterChange={setQuickFilter}
        />
        }
      </div>
      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} onUpload={handleUpload} />
      <FilePreviewModal open={!!previewFile} file={previewFile} onClose={handleClosePreview} onDownload={handleDownloadPreview} />
      <ErrorModal open={!!error} message={error} onClose={() => setError('')} />
    </div>
  );
}

export default App;
