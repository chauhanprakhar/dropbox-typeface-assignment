import React from 'react';
import './FileGrid.css';
import { downloadFile } from '../api';

const quickFilters = [
  { key: 'home', label: 'All' },
  { key: 'documents', label: 'Documents (PDFs)' },
  { key: 'photos', label: 'Photos (JPG/PNG)' },
  { key: 'gifs', label: 'GIFs' },
  { key: 'mp3', label: 'MP3' },
];

const iconFor = (item) => {
  if (item.type === 'folder') return '📁';
  switch (item.ext) {
    case 'py': return '🐍';
    case 'pdf': return '📕';
    case 'fig': return '🎨';
    case 'js': return '📜';
    case 'doc': return '📄';
    case 'jpg': return '🖼️';
    default: return '📄';
  }
};

const handleDownload = async (file) => {
  try {
    const blob = await downloadFile(file._id);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.originalName || file.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (e) {
    alert('Download failed');
  }
};

const FileGrid = ({ files, onDelete, isTrash, onPreview, showQuickFilters, quickFilter, onQuickFilterChange }) => (
  <div className="filegrid">
    {showQuickFilters && (
      <div className="filegrid-filters">
        {quickFilters.map(f => (
          <button
            className={`filegrid-filter${quickFilter === f.key ? ' active' : ''}`}
            key={f.key}
            onClick={() => onQuickFilterChange(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
    )}
    <div className="filegrid-grid">
      {files.map((item, i) => (
        <div
          className="filegrid-item"
          key={i}
          onClick={e => {
            // Prevent preview if clicking on action buttons
            if (e.target.closest('.filegrid-action-btns')) return;
            if (onPreview) onPreview(item);
          }}
        >
          <span className="filegrid-icon">{iconFor(item)}</span>
          <span className="filegrid-label">{item.originalName || item.name}</span>
          <div className="filegrid-action-btns">
            <button className="filegrid-download-btn" title="Download" onClick={e => { e.stopPropagation(); handleDownload(item); }}>⬇️</button>
            {onDelete && !isTrash && (
              <button className="filegrid-delete-btn" title="Delete" onClick={e => { e.stopPropagation(); onDelete(item.originalName || item.name); }}>🗑️</button>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default FileGrid; 