import React, { useState } from 'react';
import { FileText, Download, Eye, Calendar, Filter, BarChart3 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { mockReports, mockPrograms } from '../../lib/mockData';

export default function ReportGenerator() {
  const [reports] = useState(mockReports);
  const [selectedProgram, setSelectedProgram] = useState('');

  const filteredReports = reports.filter(report =&gt; 
    selectedProgram === '' || mockPrograms.find(p =&gt; p.id === report.programId)?.code === selectedProgram
  );

  const statusColors = {
    rascunho: 'bg-gray-100 text-gray-800',
    enviado: 'bg-blue-100 text-blue-800',
    aprovado: 'bg-green-100 text-green-800',
    rejeitado: 'bg-red-100 text-red-800'
  };

  const statusLabels = {
    rascunho: 'Rascunho',
    enviado: 'Enviado',
    aprovado: 'Aprovado',
    rejeitado: 'Rejeitado'
  };

  const reportTemplates = [
    {
      id: 'pnae-execucao',
      title: 'Relatório de Execução PNAE',
      program: 'PNAE',
      description: 'Relatório mensal de execução do Programa Nacional de Alimentação Escolar'
    },
    {
      id: 'pdde-demonstrativo',
      title: 'Demonstrativo PDDE',
      program: 'PDDE',
      description: 'Demonstrativo da execução da receita e despesa do PDDE'
    },
    {
      id: 'fundeb-aplicacao',
      title: 'Relatório de Aplicação FUNDEB',
      program: 'FUNDEB',
      description: 'Relatório de aplicação dos recursos do FUNDEB'
    },
    {
      id: 'consolidado',
      title: 'Relatório Consolidado',
      program: 'Geral',
      description: 'Relatório consolidado de todos os programas'
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Gerador de Relatórios</h1>
        <p className="text-gray-600">Gere relatórios automáticos para prestação de contas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Templates */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Modelos de Relatório</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportTemplates.map((template) =&gt; (
                  <div key={template.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="text-blue-600" size={20} />
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {template.program}
                        </span>
                      </div>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">{template.title}</h4>
                    <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Gerar Relatório
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Generated Reports */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Relatórios Gerados</h3>
              <div className="flex items-center space-x-2">
                <select
                  value={selectedProgram}
                  onChange={(e) =&gt; setSelectedProgram(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value="">Todos</option>
                  <option value="PNAE">PNAE</option>
                  <option value="PDDE">PDDE</option>
                  <option value="FUNDEB">FUNDEB</option>
                </select>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {filteredReports.map((report) =&gt; (
                  <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4 min-w-0">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <FileText className="text-blue-600" size={20} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{report.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <span>{mockPrograms.find(p =&gt; p.id === report.programId)?.code}</span>
                          <span>•</span>
                          <span>{report.period}</span>
                          <span>•</span>
                          <span>{format(report.createdAt, 'dd/MM/yyyy', { locale: ptBR })}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 ml-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[report.status]}`}>
                        {statusLabels[report.status]}
                      </span>
                      <div className="flex items-center space-x-1">
                        <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Download size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Ações Rápidas</h3>
            </div>
            <div className="p-6 space-y-3">
              <button className="w-full flex items-center space-x-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                <FileText size={16} />
                <span className="text-sm font-medium">Relatório Mensal</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                <BarChart3 size={16} />
                <span className="text-sm font-medium">Demonstrativo</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                <Calendar size={16} />
                <span className="text-sm font-medium">Relatório Anual</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
