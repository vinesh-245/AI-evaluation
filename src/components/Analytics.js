import React from 'react';

const Analytics = ({ emails, meetings }) => {
  const totalEmails = emails.length;
  const unreadEmails = emails.filter(e => !e.read).length;
  const urgentEmails = emails.filter(e => e.priority === 'Critical' || e.priority === 'High').length;
  const totalMeetings = meetings.length;
  const confirmedMeetings = meetings.filter(m => m.status === 'confirmed').length;

  return (
    <div className="analytics">
      <h3 style={{ color: '#1e40af', marginBottom: '20px' }}>📈 Analytics Dashboard</h3>
      
      <div className="chart-container">
        <h4>Email Statistics</h4>
        <div className="chart-placeholder">
          📊 Email Volume Chart
          <br />Total: {totalEmails} | Unread: {unreadEmails} | Urgent: {urgentEmails}
        </div>
      </div>
      
      <div className="chart-container">
        <h4>Meeting Analytics</h4>
        <div className="chart-placeholder">
          📅 Meeting Success Rate
          <br />Total: {totalMeetings} | Confirmed: {confirmedMeetings}
        </div>
      </div>
      
      <div className="chart-container">
        <h4>AI Performance</h4>
        <div className="chart-placeholder">
          🤖 AI Accuracy: 87%
          <br />Time Saved: 2.3 hours/day
        </div>
      </div>
    </div>
  );
};

export default Analytics;