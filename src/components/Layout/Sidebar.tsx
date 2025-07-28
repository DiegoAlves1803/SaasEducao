import React from 'react';
import { 
  Home, 
  FileText, 
  Upload, 
  Calendar, 
  BarChart3, 
  Settings, 
  BookOpen,
  Utensils,
  Coins,
  GraduationCap,
  Clock
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'programs', label: 'Programas', icon: BookOpen },
  { id: 'pnae', label: 'PNAE', icon: Utensils },
  { id: 'pdde', label: 'PDDE', icon: Coins },
  { id: 'fundeb', label: 'FUNDEB', icon: GraduationCap },
  { id: 'documents', label: 'Documentos', icon: FileText },
  { id: 'uploads', label: 'Uploads', icon: Upload },
  { id: 'calendar', label: 'Prazos', icon: Calendar },
  { id: 'reports', label: 'Relatórios', icon: BarChart3 },
  { id: 'history', label: 'Histórico', icon: Clock },
  { id: 'settings', label: 'Configurações', icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-64 bg-blue-900 min-h-screen text-white">
      <div className="p-6">
        <h1 className="text-xl font-bold mb-8">EduContas</h1>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-700 text-white'
                        : 'text-blue-100 hover:bg-blue-800'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
