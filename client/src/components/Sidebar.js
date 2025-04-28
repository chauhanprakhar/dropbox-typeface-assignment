import React from 'react';
import './Sidebar.css';

const sidebarOptions = [
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'documents', label: 'Documents (PDFs)', icon: '📄' },
  { key: 'photos', label: 'Photos (JPG/PNG)', icon: '🖼️' },
  { key: 'gifs', label: 'GIFs', icon: '🎞️' },
  { key: 'mp3', label: 'MP3', icon: '🎵' },
];

const Sidebar = ({ currentView, onNavigate }) => (
  <aside className="sidebar">
    <div className="sidebar-section">
      <nav>
        <ul>
          {sidebarOptions.map(opt => (
            <li
              key={opt.key}
              className={currentView === opt.key ? 'active' : ''}
              onClick={() => onNavigate(opt.key)}
            >
              <span role="img" aria-label={opt.label}>{opt.icon}</span> {opt.label}
            </li>
          ))}
        </ul>
      </nav>
    </div>
    <div className="sidebar-footer">
      <div>Settings</div>
      <div>Help & support</div>
    </div>
  </aside>
);

export default Sidebar; 