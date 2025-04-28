import React, { useRef, useState } from 'react';
import './UploadModal.css';

const UploadModal = ({ open, onClose, onUpload }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  if (!open) return null;

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFileChange = (e) => {
    setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  const handleCancel = () => {
    setFiles([]);
    onClose();
  };

  const handleDone = async () => {
    if (!files.length) return;
    setLoading(true);
    try {
      await onUpload(files);
      setFiles([]);
      setLoading(false);
      onClose();
    } catch (e) {
      setLoading(false);
      alert('Upload failed');
    }
  };

  return (
    <div className="upload-modal-backdrop" onClick={onClose}>
      <div className="upload-modal" onClick={e => e.stopPropagation()}>
        <button className="upload-modal-close" onClick={onClose}>×</button>
        <div
          className="upload-drop-area"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div>Drag & drop files here</div>
          <div>or</div>
          <button onClick={() => inputRef.current.click()} className="upload-browse-btn">Browse files</button>
          <input
            type="file"
            multiple
            ref={inputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
        {files.length > 0 && (
          <div className="upload-file-list">
            <div>Selected files:</div>
            <ul>
              {files.map((file, i) => (
                <li key={i}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="upload-modal-actions">
          <button className="upload-cancel-btn" onClick={handleCancel} disabled={loading}>Cancel</button>
          <button className="upload-done-btn" onClick={handleDone} disabled={!files.length || loading}>
            {loading ? 'Uploading...' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal; 