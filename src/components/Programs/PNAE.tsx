import React, { useState } from 'react';
import { Utensils, FileText, Upload, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

export default function PNAE() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: Utensils },
    { id: 'documents', label: 'Documentos', icon: FileText },
    { id: 'reports', label: 'Relatórios', icon: CheckCircle },
    { id: 'calendar', label: 'Prazos', icon: Calendar },
  ];

  const requiredDocuments = [
    { name: 'Relatório de Execução', status: 'pendente', deadline: '15/02/2024' },
    { name: 'Comprovantes de Compra', status: 'completo', deadline: '15/02/2024' },
    { name: 'Atas do CAE', status: 'pendente', deadline: '15/02/2024' },
    { name: 'Demonstrativo Sintético', status: 'completo', deadline: '15/02/2024' },
    { name: 'Termo de Doação', status: 'pendente', deadline: '15/02/2024' },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Programa Nacional de Alimentação Escolar (PNAE)
        </h1>
        <p className="text-gray-600">
          Gerencie a prestação de contas do programa de alimentação escolar
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Recursos Recebidos</p>
                  <p className="text-2xl font-bold text-gray-900">R$ 125.000</p>
                </div>
                <div className="p-3 bg-green-50 rounded-full">
                  <Utensils className="text-green-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Valor Executado</p>
                  <p className="text-2xl font-bold text-gray-900">R$ 98.500</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-full">
                  <FileText className="text-blue-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Saldo Restante</p>
                  <p className="text-2xl font-bold text-gray-900">R$ 26.500</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-full">
                  <AlertCircle className="text-yellow-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Progresso da Prestação de Contas
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Execução Orçamentária</span>
                <span>78.8%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full" style={{ width: '78.8%' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Documentos Obrigatórios</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {requiredDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        doc.status === 'completo' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <div>
                        <p className="font-medium text-gray-900">{doc.name}</p>
                        <p className="text-sm text-gray-500">Prazo: {doc.deadline}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        doc.status === 'completo' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {doc.status === 'completo' ? 'Completo' : 'Pendente'}
                      </span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        {doc.status === 'completo' ? 'Ver' : 'Enviar'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upload Area */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Enviar Documento</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Arraste e solte seus arquivos aqui</p>
                <p className="text-sm text-gray-500 mb-4">ou</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Selecionar Arquivos
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Relatórios Gerados</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Gerar Novo Relatório
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { name: 'Relatório de Execução - Janeiro 2024', date: '05/02/2024', status: 'aprovado' },
                  { name: 'Demonstrativo Sintético - Janeiro 2024', date: '05/02/2024', status: 'pendente' },
                  { name: 'Relatório de Compras - Janeiro 2024', date: '03/02/2024', status: 'aprovado' },
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{report.name}</p>
                      <p className="text-sm text-gray-500">Gerado em: {report.date}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        report.status === 'aprovado' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.status === 'aprovado' ? 'Aprovado' : 'Pendente'}
                      </span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Tab */}
      {activeTab === 'calendar' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Próximos Prazos</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { task: 'Envio do Relatório de Execução', date: '15/02/2024', days: 8, priority: 'alta' },
                  { task: 'Atas do CAE', date: '15/02/2024', days: 8, priority: 'alta' },
                  { task: 'Demonstrativo Final', date: '28/02/2024', days: 21, priority: 'media' },
                  { task: 'Comprovantes de Compra', date: '15/03/2024', days: 36, priority: 'baixa' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        item.priority === 'alta' ? 'bg-red-500' :
                        item.priority === 'media' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <div>
                        <p className="font-medium text-gray-900">{item.task}</p>
                        <p className="text-sm text-gray-500">Prazo: {item.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{item.days} dias</p>
                      <p className="text-xs text-gray-500">restantes</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
