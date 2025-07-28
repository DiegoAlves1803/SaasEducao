import React, { useState, useMemo } from 'react';
import { Clock, User, CheckCircle, AlertCircle, Search, FolderKanban } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { mockAuditEvents } from '../../lib/mockData';
import Pagination from '../Common/Pagination';

export default function AuditTrail() {
  const [auditEvents] = useState(mockAuditEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProgram, setFilterProgram] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredEvents = useMemo(() =&gt; {
    return auditEvents.filter(event =&gt; {
      return (
        (event.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
         event.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
         event.user.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterProgram === '' || event.program === filterProgram) &&
        (filterStatus === '' || event.status === filterStatus)
      );
    });
  }, [auditEvents, searchTerm, filterProgram, filterStatus]);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusIcon = (status: string) =&gt; {
    switch (status) {
      case 'success':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'warning':
        return <AlertCircle className="text-yellow-600" size={20} />;
      case 'error':
        return <AlertCircle className="text-red-600" size={20} />;
      default:
        return <Clock className="text-gray-600" size={20} />;
    }
  };

  const getStatusColor = (status: string) =&gt; {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-l-4 border-green-400';
      case 'warning':
        return 'bg-yellow-50 border-l-4 border-yellow-400';
      case 'error':
        return 'bg-red-50 border-l-4 border-red-400';
      default:
        return 'bg-gray-50 border-l-4 border-gray-400';
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Histórico de Atividades</h1>
        <p className="text-gray-600">Acompanhe todas as ações realizadas no sistema</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Buscar atividades..."
                value={searchTerm}
                onChange={(e) =&gt; setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={filterProgram}
              onChange={(e) =&gt; setFilterProgram(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos os Programas</option>
              <option value="PNAE">PNAE</option>
              <option value="PDDE">PDDE</option>
              <option value="FUNDEB">FUNDEB</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) =&gt; setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos os Status</option>
              <option value="success">Sucesso</option>
              <option value="warning">Aviso</option>
              <option value="error">Erro</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Exportar Histórico
            </button>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Timeline de Atividades ({filteredEvents.length})
          </h3>
        </div>
        <div className="p-6">
          {currentEvents.length > 0 ? (
            <div className="space-y-4">
              {currentEvents.map((event) =&gt; (
                <div key={event.id} className={`p-4 rounded-lg ${getStatusColor(event.status)}`}>
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(event.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            <p className="font-semibold text-gray-900">{event.action}</p>
                            <span className="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-800 rounded">
                              {event.program}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            {format(event.timestamp, 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                          </p>
                        </div>
                        <p className="text-sm text-gray-700 font-medium mb-1">{event.target}</p>
                        <p className="text-sm text-gray-600 mb-2">{event.details}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <User size={12} />
                          <span>{event.user}</span>
                        </div>
                      </div>
                    </div>
                </div>
              ))}
            </div>
          ) : (
             <div className="text-center py-12">
                <FolderKanban size={48} className="mx-auto text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhuma atividade encontrada</h3>
                <p className="mt-1 text-sm text-gray-500">Tente ajustar seus filtros de busca.</p>
            </div>
          )}
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  );
}
