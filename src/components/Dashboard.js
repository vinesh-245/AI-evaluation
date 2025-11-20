import React from 'react';

const Dashboard = ({ emails, meetings }) => {
  const unreadEmails = emails.filter(email => !email.read).length;
  const urgentEmails = emails.filter(email => email.priority === 'Critical' || email.priority === 'High').length;
  const todayMeetings = meetings.filter(meeting => {
    const today = new Date().toISOString().split('T')[0];
    return meeting.date === today;
  }).length;
  const pendingMeetings = meetings.filter(meeting => meeting.status === 'pending').length;

  const priorityEmails = emails
    .filter(email => email.priority === 'Critical' || email.priority === 'High')
    .slice(0, 3);

  const upcomingMeetings = meetings
    .filter(meeting => new Date(meeting.date) >= new Date())
    .slice(0, 3);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="dashboard">
      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h4>{unreadEmails}</h4>
          <p>Unread Emails</p>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '5px' }}>
            🔴 {urgentEmails} urgent
          </div>
        </div>
        
        <div className="stat-card">
          <h4>{todayMeetings}</h4>
          <p>Today's Meetings</p>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '5px' }}>
            ⏰ {pendingMeetings} pending
          </div>
        </div>
        
        <div className="stat-card">
          <h4>87%</h4>
          <p>AI Accuracy</p>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '5px' }}>
            🎯 Email categorization
          </div>
        </div>
        
        <div className="stat-card">
          <h4>2.3h</h4>
          <p>Time Saved Today</p>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '5px' }}>
            ⚡ AI automation
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="dashboard-main">
        {/* Priority Emails Section */}
        <div className="dashboard-section">
          <h3>🔥 Priority Emails</h3>
          {priorityEmails.length > 0 ? (
            <div className="priority-emails">
              {priorityEmails.map(email => (
                <div key={email.id} className="email-item priority-item">
                  <div className="email-header">
                    <div className="email-sender">{email.sender}</div>
                    <div className="email-time">{formatTime(email.timestamp)}</div>
                  </div>
                  <div className="email-subject">{email.subject}</div>
                  <div className="email-preview">{email.preview.substring(0, 80)}...</div>
                  <div className="email-meta">
                    <span className={`priority-tag priority-${email.priority.toLowerCase()}`}>
                      {email.priority}
                    </span>
                    <span className={`category-tag category-${email.category.toLowerCase().replace(' ', '-')}`}>
                      {email.category}
                    </span>
                  </div>
                  {email.aiSummary && (
                    <div className="ai-summary">
                      {email.aiSummary}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
              ✅ No priority emails at the moment!
            </div>
          )}
        </div>

        {/* Upcoming Meetings Section */}
        <div className="dashboard-section">
          <h3>📅 Upcoming Meetings</h3>
          {upcomingMeetings.length > 0 ? (
            <div className="upcoming-meetings">
              {upcomingMeetings.map(meeting => (
                <div key={meeting.id} className="meeting-item">
                  <div className="meeting-header">
                    <div className="meeting-title">{meeting.title}</div>
                    <div className={`meeting-status status-${meeting.status}`}>
                      {meeting.status}
                    </div>
                  </div>
                  <div className="meeting-details">
                    <div>📅 {meeting.date} at {meeting.time}</div>
                    <div>⏱️ {meeting.duration} minutes</div>
                    <div>👥 {meeting.participants.length} participants</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
              🎆 No upcoming meetings scheduled!
            </div>
          )}
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="dashboard-section ai-insights" style={{ gridColumn: '1 / -1', marginTop: '20px' }}>
        <h3>🤖 AI Insights & Recommendations</h3>
        <div className="insights-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px', marginTop: '15px' }}>
          <div className="insight-card" style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '15px' }}>
            <h4 style={{ color: '#0c4a6e', marginBottom: '8px' }}>📊 Email Patterns</h4>
            <p style={{ fontSize: '14px', color: '#0c4a6e' }}>
              You receive 23% more emails on Mondays. Consider scheduling focused email time at 9 AM.
            </p>
          </div>
          
          <div className="insight-card" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '15px' }}>
            <h4 style={{ color: '#14532d', marginBottom: '8px' }}>⏰ Optimal Meeting Times</h4>
            <p style={{ fontSize: '14px', color: '#14532d' }}>
              Your team is most responsive between 10-11 AM and 2-3 PM for scheduling meetings.
            </p>
          </div>
          
          <div className="insight-card" style={{ background: '#fefce8', border: '1px solid #fde047', borderRadius: '8px', padding: '15px' }}>
            <h4 style={{ color: '#713f12', marginBottom: '8px' }}>🎯 Response Efficiency</h4>
            <p style={{ fontSize: '14px', color: '#713f12' }}>
              Using AI-suggested responses can reduce your email response time by 40%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;