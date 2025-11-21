import React, { useState } from 'react';

const EmailList = ({ emails, setEmails }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedEmail, setSelectedEmail] = useState(null);

  const categories = ['all', 'urgent', 'meetings', 'follow-up', 'newsletters'];

  const filteredEmails = emails.filter(email => {
    if (activeFilter === 'all') return true;
    return email.category.toLowerCase() === activeFilter;
  });

  const markAsRead = (emailId) => {
    setEmails(emails.map(email => 
      email.id === emailId ? { ...email, read: true } : email
    ));
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const generateAIResponse = (email) => {
    const responses = {
      'meetings': `Thank you for reaching out about the ${email.subject.toLowerCase()}. I'll check my calendar and get back to you with available time slots within the next 2 hours.`,
      'follow-up': `Thank you for your follow-up on ${email.subject.toLowerCase()}. I appreciate your patience and will provide you with a detailed update by end of day.`,
      'urgent': `I've received your urgent message regarding ${email.subject.toLowerCase()}. This is now my top priority and I'll address it immediately.`,
      'newsletters': 'Thank you for the newsletter. I\'ll review the content when I have time.'
    };
    
    return responses[email.category.toLowerCase()] || 'Thank you for your email. I\'ll review it and get back to you soon.';
  };

  return (
    <div className="email-list">
      {/* Email Filters */}
      <div className="email-filters">
        <h3 style={{ marginBottom: '15px', color: '#1e40af' }}>📧 Smart Inbox</h3>
        <div className="filter-buttons">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
              onClick={() => setActiveFilter(category)}
            >
              {category === 'all' ? '📋 All' : 
               category === 'urgent' ? '🚨 Urgent' :
               category === 'meetings' ? '📅 Meetings' :
               category === 'follow-up' ? '🔄 Follow-up' :
               '📰 Newsletters'}
              <span style={{ marginLeft: '5px', fontSize: '12px', opacity: 0.7 }}>
                ({emails.filter(e => category === 'all' || e.category.toLowerCase() === category).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Email List */}
      <div className="emails-container">
        {filteredEmails.length > 0 ? (
          filteredEmails.map(email => (
            <div 
              key={email.id} 
              className={`email-item ${!email.read ? 'unread' : ''}`}
              onClick={() => {
                setSelectedEmail(selectedEmail === email.id ? null : email.id);
                if (!email.read) markAsRead(email.id);
              }}
            >
              <div className="email-header">
                <div className="email-sender">
                  {!email.read && <span style={{ color: '#3b82f6', marginRight: '5px' }}>●</span>}
                  {email.sender}
                </div>
                <div className="email-time">{formatTime(email.timestamp)}</div>
              </div>
              
              <div className="email-subject">{email.subject}</div>
              <div className="email-preview">{email.preview}</div>
              
              <div className="email-meta">
                <span className={`category-tag category-${email.category.toLowerCase().replace(' ', '-')}`}>
                  {email.category}
                </span>
                <span className={`priority-tag priority-${email.priority.toLowerCase()}`}>
                  {email.priority}
                </span>
              </div>

              {/* AI Summary */}
              {email.aiSummary && (
                <div className="ai-summary">
                  {email.aiSummary}
                </div>
              )}

              {/* Expanded Email Details */}
              {selectedEmail === email.id && (
                <div className="email-details" style={{ 
                  marginTop: '15px', 
                  padding: '15px', 
                  background: '#f8fafc', 
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <h4 style={{ color: '#1e40af', marginBottom: '10px' }}>🤖 AI-Suggested Actions</h4>
                  
                  <div className="ai-actions" style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
                    <button 
                      className="action-btn"
                      style={{
                        padding: '8px 12px',
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        alert('Quick reply sent!');
                      }}
                    >
                      ⚡ Quick Reply
                    </button>
                    
                    <button 
                      className="action-btn"
                      style={{
                        padding: '8px 12px',
                        background: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        alert('Meeting scheduled!');
                      }}
                    >
                      📅 Schedule Meeting
                    </button>
                    
                    <button 
                      className="action-btn"
                      style={{
                        padding: '8px 12px',
                        background: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        alert('Added to follow-up list!');
                      }}
                    >
                      🔄 Follow Up
                    </button>
                  </div>

                  <div className="ai-response" style={{
                    background: 'white',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db'
                  }}>
                    <h5 style={{ color: '#374151', marginBottom: '8px' }}>💬 Suggested Response:</h5>
                    <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.5' }}>
                      {generateAIResponse(email)}
                    </p>
                    <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                      <button 
                        style={{
                          padding: '6px 12px',
                          background: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Response sent!');
                        }}
                      >
                        Send
                      </button>
                      <button 
                        style={{
                          padding: '6px 12px',
                          background: '#6b7280',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Response customized!');
                        }}
                      >
                        Customize
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#64748b',
            background: 'white',
            borderRadius: '12px'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>📭</div>
            <h3>No emails in this category</h3>
            <p>Your {activeFilter} inbox is clean!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailList;