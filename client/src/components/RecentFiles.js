import React from 'react';
import './RecentFiles.css';

const iconFor = (type) => {
  switch (type) {
    case 'folder': return '📁';
    case 'doc': return '📄';
    case 'img': return '🖼️';
    case 'xls': return '📊';
    case 'pdf': return '📕';
    case 'jpg': return '🖼️';
    default: return '📄';
  }
};

const RecentFiles = ({ recentFiles, onClear }) => {
  if (!recentFiles || recentFiles.length === 0) return null;
  return (
    <div className="recent-files">
      <div className="recent-title">Recently opened</div>
      <div className="recent-list">
        {recentFiles.map((item, i) => (
          <div className="recent-item" key={i}>
            <span className="recent-icon">{iconFor(item.type)}</span>
            <span className="recent-label">{item.originalName || item.name}</span>
          </div>
        ))}
      </div>
      <span className="recent-clear" onClick={onClear}>Clear</span>
    </div>
  );
};

export default RecentFiles; 