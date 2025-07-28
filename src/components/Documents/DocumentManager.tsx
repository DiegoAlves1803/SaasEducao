import React, { useState, useMemo } from 'react';
import { FileText, Upload, Download, Eye, Trash2, Search, Filter, FolderKanban } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { mockDocuments, mockPrograms } from '../../lib/mockData';
import Pagination from '../Common/Pagination';

export default function DocumentManager() {
  const [documents] = useState(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProgram, setFilterProgram] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredDocuments = useMemo(() =&gt; {
    const programCode = mockPrograms.find(p =&gt; p.id === filterProgram)?.code || '';
    return documents.filter(doc =&gt; {
      const programOfDoc = mockPrograms.find(p =&gt; p.id === doc.programId);
      return (
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterProgram === '' || doc.programId === filterProgram) &&
        (filterStatus === '' || doc.status === filterStatus)
      );
    });
  }, [documents, searchTerm, filterProgram, filterStatus]);

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const currentDocuments = filteredDocuments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const statusColors = {
    aprovado: 'bg-green-100 text-green-800',
    pendente: 'bg-yellow-100 text-yellow-800',
    rejeitado: 'bg-red-100 text-red-800'
  };

  const statusLabels = {
    aprovado: 'Aprovado',
    pendente: 'Pendente',
    rejeitado: 'Rejeitado'
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Gerenciamento de Documentos</h1>
        <p className="text-gray-600">Organize e gerencie todos os documentos de prestação de contas</p>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload de Documentos</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">Arraste e solte seus arquivos aqui</p>
            <p className="text-sm text-gray-500 mb-4">Formatos aceitos: PDF, DOC, DOCX, XLS, XLSX, ZIP (máx. 50MB)</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Selecionar Arquivos
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Buscar documentos..."
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
              {mockPrograms.map(p =&gt; <option key={p.id} value={p.id}>{p.code} - {p.name}</option>)}
            </select>
            <select
              value={filterStatus}
              onChange={(e) =&gt; setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos os Status</option>
              <option value="aprovado">Aprovado</option>
              <option value="pendente">Pendente</option>
              <option value="rejeitado">Rejeitado</option>
            </select>
            <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Filter size={16} />
              <span>Filtros Avançados</span>
            </button>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Documentos ({filteredDocuments.length})
          </h3>
        </div>
        <div className="p-6">
          {currentDocuments.length > 0 ? (
            <div className="space-y-4">
              {currentDocuments.map((doc) =&gt; (
                <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <FileText className="text-blue-600" size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate">{doc.name}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span>{mockPrograms.find(p =&gt; p.id === doc.programId)?.code}</span>
                        <span>•</span>
                        <span>{doc.type}</span>
                        <span>•</span>
                        <span>{(doc.size / 1024).toFixed(2)} MB</span>
                        <span>•</span>
                        <span>{format(doc.uploadDate, 'dd/MM/yyyy', { locale: ptBR })}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 ml-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[doc.status]}`}>
                      {statusLabels[doc.status]}
                    </span>
                    <div className="flex items-center space-x-1">
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Download size={16} />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
                <FolderKanban size={48} className="mx-auto text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhum documento encontrado</h3>
                <p className="mt-1 text-sm text-gray-500">Tente ajustar seus filtros de busca.</p>
            </div>
          )}
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  );
}
