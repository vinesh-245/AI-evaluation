import React, { useState, useEffect } from 'react';
import { Clock, DollarSign, Users, BarChart3, Receipt, TrendingUp, Menu, X, Moon, Sun, Plus, Search, Filter, Download, Bell } from 'lucide-react';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);

  // Sample data for demonstration
  const [projects, setProjects] = useState([
    { id: 1, name: 'Website Redesign', client: 'TechCorp', status: 'In Progress', hours: 45, rate: 75, deadline: '2024-12-15' },
    { id: 2, name: 'Mobile App Development', client: 'StartupXYZ', status: 'Planning', hours: 12, rate: 85, deadline: '2024-12-30' },
    { id: 3, name: 'Brand Identity', client: 'LocalBiz', status: 'Completed', hours: 28, rate: 65, deadline: '2024-11-20' }
  ]);

  const [timeEntries, setTimeEntries] = useState([
    { id: 1, project: 'Website Redesign', task: 'Frontend Development', hours: 3.5, date: '2024-11-20' },
    { id: 2, project: 'Mobile App Development', task: 'UI Design', hours: 2, date: '2024-11-20' },
    { id: 3, project: 'Brand Identity', task: 'Logo Design', hours: 4, date: '2024-11-19' }
  ]);

  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Software License', amount: 99, category: 'Tools', date: '2024-11-15' },
    { id: 2, description: 'Office Supplies', amount: 45, category: 'Office', date: '2024-11-18' },
    { id: 3, description: 'Client Meeting', amount: 25, category: 'Travel', date: '2024-11-19' }
  ]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const totalRevenue = projects.reduce((sum, project) => sum + (project.hours * project.rate), 0);
  const totalHours = timeEntries.reduce((sum, entry) => sum + entry.hours, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const activeProjects = projects.filter(p => p.status !== 'Completed').length;

  const DashboardContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <Bell size={20} />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
          <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hours This Week</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalHours}</p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Projects</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeProjects}</p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Expenses</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalExpenses}</p>
            </div>
            <Receipt className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Projects</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {projects.slice(0, 3).map(project => (
              <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{project.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{project.client}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">${project.hours * project.rate}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    project.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    project.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const TimeTrackingContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Time Tracking</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus size={16} />
          <span>Start Timer</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Time Entries</h2>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                <Search size={16} />
              </button>
              <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                <Filter size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {timeEntries.map(entry => (
              <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{entry.task}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{entry.project}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">{entry.hours}h</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{entry.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const InvoicesContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Invoices</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus size={16} />
          <span>Create Invoice</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Invoices</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {projects.map(project => (
              <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Invoice #{project.id.toString().padStart(4, '0')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{project.client}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">${project.hours * project.rate}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{project.deadline}</p>
                  </div>
                  <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ProjectsContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus size={16} />
          <span>New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.name}</h3>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                project.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                project.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              }`}>
                {project.status}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-2">{project.client}</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Hours:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{project.hours}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Rate:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">${project.rate}/hr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">${project.hours * project.rate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Deadline:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{project.deadline}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ExpensesContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Expenses</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus size={16} />
          <span>Add Expense</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Expenses</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {expenses.map(expense => (
              <div key={expense.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{expense.description}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{expense.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">${expense.amount}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{expense.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const AnalyticsContent = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Revenue Trend</h2>
          <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <TrendingUp size={48} />
            <span className="ml-2">Chart visualization would go here</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Project Distribution</h2>
          <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <BarChart3 size={48} />
            <span className="ml-2">Chart visualization would go here</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardContent />;
      case 'time': return <TimeTrackingContent />;
      case 'invoices': return <InvoicesContent />;
      case 'projects': return <ProjectsContent />;
      case 'expenses': return <ExpensesContent />;
      case 'analytics': return <AnalyticsContent />;
      default: return <DashboardContent />;
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'time', label: 'Time Tracking', icon: Clock },
    { id: 'invoices', label: 'Invoices', icon: DollarSign },
    { id: 'projects', label: 'Projects', icon: Users },
    { id: 'expenses', label: 'Expenses', icon: Receipt },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">FreelanceAI</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {menuItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    activeTab === item.id
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon size={18} className="mr-3" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Page content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;