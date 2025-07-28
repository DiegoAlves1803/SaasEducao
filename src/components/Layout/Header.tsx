import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';

interface HeaderProps {
  user: {
    name: string;
    institution: string;
    role: string;
  };
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Sistema de Prestação de Contas
          </h2>
          <p className="text-sm text-gray-600">{user.institution}</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-600 capitalize">{user.role}</p>
            </div>
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
          </div>
          
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
