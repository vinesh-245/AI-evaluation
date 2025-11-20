import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import EmailList from './components/EmailList';
import MeetingScheduler from './components/MeetingScheduler';
import Analytics from './components/Analytics';
import Settings from './components/Settings';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [emails, setEmails] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading sample data
    setTimeout(() => {
      setEmails([
        {
          id: 1,
          sender: 'john.doe@company.com',
          subject: 'Q4 Budget Review Meeting',
          preview: 'Hi team, I wanted to schedule our quarterly budget review...',
          category: 'Meetings',
          priority: 'High',
          timestamp: '2024-11-20T10:30:00Z',
          aiSummary: 'John wants to schedule Q4 budget review meeting for next week. Requires financial reports and attendance from all department heads.',
          read: false
        },
        {
          id: 2,
          sender: 'sarah.wilson@client.com',
          subject: 'Project Proposal Feedback',
          preview: 'Thank you for the detailed proposal. I have reviewed it with my team...',
          category: 'Follow-up',
          priority: 'High',
          timestamp: '2024-11-20T09:15:00Z',
          aiSummary: 'Client Sarah Wilson provides positive feedback on proposal. Requests minor changes to timeline and budget. Ready to proceed with contract.',
          read: false
        },
        {
          id: 3,
          sender: 'newsletter@techcrunch.com',
          subject: 'Daily Tech News Digest',
          preview: 'Today\'s top stories: AI breakthrough in healthcare, new startup funding...',
          category: 'Newsletters',
          priority: 'Low',
          timestamp: '2024-11-20T08:00:00Z',
          aiSummary: 'Daily tech news covering AI healthcare advances, startup funding rounds, and industry trends.',
          read: true
        },
        {
          id: 4,
          sender: 'urgent@support.com',
          subject: 'Server Maintenance Alert',
          preview: 'URGENT: Scheduled maintenance window tonight from 11 PM to 2 AM...',
          category: 'Urgent',
          priority: 'Critical',
          timestamp: '2024-11-20T07:45:00Z',
          aiSummary: 'Critical server maintenance scheduled tonight 11 PM - 2 AM. Services will be temporarily unavailable. Backup systems activated.',
          read: false
        }
      ]);

      setMeetings([
        {
          id: 1,
          title: 'Weekly Team Standup',
          participants: ['john.doe@company.com', 'sarah.wilson@company.com', 'mike.johnson@company.com'],
          date: '2024-11-21',
          time: '09:00',
          duration: 30,
          status: 'confirmed'
        },
        {
          id: 2,
          title: 'Client Presentation',
          participants: ['you@company.com', 'client@external.com'],
          date: '2024-11-22',
          time: '14:00',
          duration: 60,
          status: 'pending'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard emails={emails} meetings={meetings} />;
      case 'emails':
        return <EmailList emails={emails} setEmails={setEmails} />;
      case 'meetings':
        return <MeetingScheduler meetings={meetings} setMeetings={setMeetings} />;
      case 'analytics':
        return <Analytics emails={emails} meetings={meetings} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard emails={emails} meetings={meetings} />;
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <h2>Loading InboxIQ...</h2>
        <p>Initializing AI-powered email management</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="main-content">
        <header className="app-header">
          <h1>InboxIQ</h1>
          <p>AI-Powered Email & Meeting Management</p>
        </header>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;