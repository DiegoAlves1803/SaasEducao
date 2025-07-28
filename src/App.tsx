import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import ProgramsList from './components/Programs/ProgramsList';
import PNAE from './components/Programs/PNAE';
import PDDE from './components/Programs/PDDE';
import FUNDEB from './components/Programs/FUNDEB';
import DocumentManager from './components/Documents/DocumentManager';
import DeadlineCalendar from './components/Calendar/DeadlineCalendar';
import ReportGenerator from './components/Reports/ReportGenerator';
import AuditTrail from './components/History/AuditTrail';
import SystemSettings from './components/Settings/SystemSettings';
import Login from './components/Auth/Login';

const mockUser = {
  name: 'Maria Silva Santos',
  institution: 'EMEF José de Alencar',
  role: 'escola',
  email: 'maria@escola.edu.br',
  cnpj: '12.345.678/0001-90'
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () =&gt; {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'programs':
        return <ProgramsList />;
      case 'pnae':
        return <PNAE />;
      case 'pdde':
        return <PDDE />;
      case 'fundeb':
        return <FUNDEB />;
      case 'documents':
        return <DocumentManager />;
      case 'uploads':
        return <DocumentManager />;
      case 'calendar':
        return <DeadlineCalendar />;
      case 'reports':
        return <ReportGenerator />;
      case 'history':
        return <AuditTrail />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={() =&gt; setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={mockUser} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
