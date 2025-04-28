import React from 'react';
import './Topbar.css';

const Topbar = ({ onUploadClick, title }) => (
  <div className="topbar">
    <div className="topbar-left">
      <span className="topbar-home-icon" role="img" aria-label="home">🏠</span>
      <span className="topbar-breadcrumb">{title}</span>
    </div>
    <div className="topbar-right">
      <button className="topbar-upload" onClick={onUploadClick}>Upload file</button>
    </div>
  </div>
);

export default Topbar; 