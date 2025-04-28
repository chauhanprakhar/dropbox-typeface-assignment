import React from 'react';
import './FilePreviewModal.css';

const FilePreviewModal = ({ open, file, onClose, onDownload }) => {
  if (!open || !file) return null;

  const isImage = file.mimeType && file.mimeType.startsWith('image/') && file.mimeType !== 'image/gif';
  const isGif = file.mimeType === 'image/gif' || (file.ext && file.ext.toLowerCase() === 'gif');
  const isPdf = file.mimeType === 'application/pdf';
  const isMp3 = file.mimeType === 'audio/mp3' || file.mimeType === 'audio/mpeg' || (file.ext && file.ext.toLowerCase() === 'mp3');

  return (
    <div className="preview-modal-backdrop" onClick={onClose}>
      <div className="preview-modal" onClick={e => e.stopPropagation()}>
        <button className="preview-modal-close" onClick={onClose}>×</button>
        <div className="preview-modal-header">
          <span>{file.originalName || file.name}</span>
          <button className="preview-modal-download" onClick={onDownload}>⬇️ Download</button>
        </div>
        <div className="preview-modal-content">
          {isImage && <img src={file.blobUrl} alt={file.originalName || file.name} className="preview-img" />}
          {isGif && <img src={file.blobUrl} alt={file.originalName || file.name} className="preview-img" />}
          {isPdf && (
            <iframe
              src={file.blobUrl}
              title="PDF Preview"
              className="preview-pdf"
              frameBorder="0"
            />
          )}
          {isMp3 && (
            <audio controls className="preview-audio">
              <source src={file.blobUrl} type={file.mimeType} />
              Your browser does not support the audio element.
            </audio>
          )}
          {!isImage && !isGif && !isPdf && !isMp3 && <div>Preview not available for this file type.</div>}
        </div>
      </div>
    </div>
  );
};

export default FilePreviewModal; 