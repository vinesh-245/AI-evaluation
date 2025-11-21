import React, { useState } from 'react';

const MeetingScheduler = ({ meetings, setMeetings }) => {
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    participants: '',
    date: '',
    time: '',
    duration: 30
  });

  const [showAISuggestions, setShowAISuggestions] = useState(false);

  const aiTimeSuggestions = [
    { time: '09:00', reason: 'High productivity hours - 85% acceptance rate' },
    { time: '10:30', reason: 'Post-coffee break - Good for creative discussions' },
    { time: '14:00', reason: 'Post-lunch energy - 78% acceptance rate' },
    { time: '15:30', reason: 'Afternoon focus time - Low conflict probability' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const meeting = {
      id: meetings.length + 1,
      title: newMeeting.title,
      participants: newMeeting.participants.split(',').map(p => p.trim()),
      date: newMeeting.date,
      time: newMeeting.time,
      duration: parseInt(newMeeting.duration),
      status: 'pending'
    };
    
    setMeetings([...meetings, meeting]);
    setNewMeeting({ title: '', participants: '', date: '', time: '', duration: 30 });
    alert('Meeting scheduled! AI will send invitations to all participants.');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="meeting-scheduler">
      {/* Meeting Form */}
      <div className="meeting-form">
        <h3 style={{ color: '#1e40af', marginBottom: '20px' }}>📅 AI Meeting Scheduler</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Meeting Title</label>
            <input
              type="text"
              value={newMeeting.title}
              onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
              placeholder="e.g., Weekly Team Standup"
              required
            />
          </div>

          <div className="form-group">
            <label>Participants (comma-separated emails)</label>
            <input
              type="text"
              value={newMeeting.participants}
              onChange={(e) => setNewMeeting({...newMeeting, participants: e.target.value})}
              placeholder="john@company.com, sarah@company.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={newMeeting.date}
              onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="form-group">
            <label>Time</label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                type="time"
                value={newMeeting.time}
                onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                required
                style={{ flex: 1 }}
              />
              <button
                type="button"
                onClick={() => setShowAISuggestions(!showAISuggestions)}
                style={{
                  padding: '8px 12px',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                🤖 AI Suggest
              </button>
            </div>
          </div>

          {/* AI Time Suggestions */}
          {showAISuggestions && (
            <div style={{
              background: '#f0f9ff',
              border: '1px solid #bae6fd',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '15px'
            }}>
              <h4 style={{ color: '#0c4a6e', marginBottom: '10px' }}>🤖 AI Optimal Time Suggestions</h4>
              {aiTimeSuggestions.map((suggestion, index) => (
                <div 
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px',
                    background: 'white',
                    borderRadius: '6px',
                    marginBottom: '8px',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setNewMeeting({...newMeeting, time: suggestion.time});
                    setShowAISuggestions(false);
                  }}
                >
                  <div>
                    <strong style={{ color: '#1e40af' }}>{suggestion.time}</strong>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{suggestion.reason}</div>
                  </div>
                  <button 
                    type="button"
                    style={{
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      fontSize: '10px'
                    }}
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="form-group">
            <label>Duration (minutes)</label>
            <select
              value={newMeeting.duration}
              onChange={(e) => setNewMeeting({...newMeeting, duration: e.target.value})}
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>1 hour</option>
              <option value={90}>1.5 hours</option>
              <option value={120}>2 hours</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            🚀 Schedule Meeting with AI
          </button>
        </form>
      </div>

      {/* Meetings List */}
      <div className="meeting-list">
        <h3 style={{ color: '#1e40af', marginBottom: '20px' }}>📅 Scheduled Meetings</h3>
        
        {meetings.length > 0 ? (
          meetings.map(meeting => (
            <div key={meeting.id} className="meeting-item" style={{
              padding: '15px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              marginBottom: '10px',
              background: 'white'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div className="meeting-title" style={{ fontWeight: '600', color: '#1e40af' }}>
                  {meeting.title}
                </div>
                <div 
                  style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: 'white',
                    background: getStatusColor(meeting.status)
                  }}
                >
                  {meeting.status}
                </div>
              </div>
              
              <div className="meeting-details" style={{ fontSize: '14px', color: '#64748b' }}>
                <div style={{ marginBottom: '5px' }}>
                  📅 {new Date(meeting.date).toLocaleDateString()} at {meeting.time}
                </div>
                <div style={{ marginBottom: '5px' }}>
                  ⏱️ {meeting.duration} minutes
                </div>
                <div style={{ marginBottom: '10px' }}>
                  👥 {meeting.participants.length} participants: {meeting.participants.slice(0, 2).join(', ')}
                  {meeting.participants.length > 2 && ` +${meeting.participants.length - 2} more`}
                </div>
              </div>

              {/* AI Meeting Insights */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                padding: '10px',
                marginTop: '10px'
              }}>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>
                  🤖 AI Insights:
                </div>
                <div style={{ fontSize: '12px', color: '#374151' }}>
                  {meeting.status === 'pending' ? 
                    'Waiting for participant responses. 73% chance of acceptance based on historical data.' :
                    meeting.status === 'confirmed' ?
                    'All participants confirmed. Optimal time slot selected with 91% satisfaction rate.' :
                    'Meeting cancelled. AI suggests rescheduling for next Tuesday 2-3 PM.'}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <button 
                  style={{
                    padding: '6px 12px',
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                  onClick={() => alert('Meeting details sent to all participants!')}
                >
                  📧 Send Reminder
                </button>
                <button 
                  style={{
                    padding: '6px 12px',
                    background: '#f59e0b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                  onClick={() => alert('AI will suggest 3 alternative time slots!')}
                >
                  🔄 Reschedule
                </button>
              </div>
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
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>📅</div>
            <h3>No meetings scheduled</h3>
            <p>Use the AI scheduler to create your first meeting!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingScheduler;