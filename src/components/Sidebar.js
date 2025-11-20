import React from 'react';

const Sidebar = ({ activeView, setActiveView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'emails', label: 'Smart Inbox', icon: '📧' },
    { id: 'meetings', label: 'Meeting Scheduler', icon: '📅' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>🤖 InboxIQ</h2>
        <p>AI-Powered Assistant</p>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map(item => (
            <li key={item.id}>
              <button
                className={activeView === item.id ? 'active' : ''}
                onClick={() => setActiveView(item.id)}
              >
                <span className="icon">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer" style={{ padding: '20px', marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
        <div style={{ fontSize: '12px', opacity: 0.7 }}>
          <p>Powered by AI</p>
          <p>Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;