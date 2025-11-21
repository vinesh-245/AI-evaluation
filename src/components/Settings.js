import React, { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    aiCategorization: true,
    autoResponses: false,
    meetingReminders: true,
    emailSummaries: true,
    smartScheduling: true
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="settings">
      <h3 style={{ color: '#1e40af', marginBottom: '20px' }}>⚙️ Settings</h3>
      
      <div className="settings-section">
        <h3>AI Features</h3>
        
        <div className="toggle-switch">
          <div 
            className={`switch ${settings.aiCategorization ? 'active' : ''}`}
            onClick={() => toggleSetting('aiCategorization')}
          ></div>
          <span>AI Email Categorization</span>
        </div>
        
        <div className="toggle-switch">
          <div 
            className={`switch ${settings.autoResponses ? 'active' : ''}`}
            onClick={() => toggleSetting('autoResponses')}
          ></div>
          <span>Auto-Generated Responses</span>
        </div>
        
        <div className="toggle-switch">
          <div 
            className={`switch ${settings.emailSummaries ? 'active' : ''}`}
            onClick={() => toggleSetting('emailSummaries')}
          ></div>
          <span>AI Email Summaries</span>
        </div>
        
        <div className="toggle-switch">
          <div 
            className={`switch ${settings.smartScheduling ? 'active' : ''}`}
            onClick={() => toggleSetting('smartScheduling')}
          ></div>
          <span>Smart Meeting Scheduling</span>
        </div>
      </div>
      
      <div className="settings-section">
        <h3>Notifications</h3>
        
        <div className="toggle-switch">
          <div 
            className={`switch ${settings.meetingReminders ? 'active' : ''}`}
            onClick={() => toggleSetting('meetingReminders')}
          ></div>
          <span>Meeting Reminders</span>
        </div>
      </div>
      
      <button 
        className="btn-primary"
        onClick={() => alert('Settings saved successfully!')}
        style={{ marginTop: '20px' }}
      >
        Save Settings
      </button>
    </div>
  );
};

export default Settings;