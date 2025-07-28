import React, { useState } from 'react';
import { Coins, FileText, Upload, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

export default function PDDE() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: Coins },
    { id: 'resources', label: 'Recursos', icon: FileText },
    { id: 'execution', label: 'Execução', icon: CheckCircle },
    { id: 'documents', label: 'Documentos', icon: Upload },
    { id: 'deadlines', label: 'Prazos', icon: Calendar },
  ];

  const resourceCategories = [
    { name: 'Custeio', allocated: 15000, spent: 12500, percentage: 83.3 },
    { name: 'Capital', allocated: 8000, spent: 6200, percentage: 77.5 },
    { name: 'Manutenção', allocated: 12000, spent: 9800, percentage: 81.7 },
  ];

  const requiredDocuments = [
    { name: 'Demonstrativo da Execução da Receita e Despesa', status: 'completo', deadline: '30/03/2024' },
    { name: 'Extrato Bancário', status: 'pendente', deadline: '30/03/2024' },
    { name: 'Conciliação Bancária', status: 'pendente', deadline: '30/03/2024' },
    { name: 'Relação de Bens Adquiridos/Produzidos', status: 'completo', deadline: '30/03/2024' },
    { name: 'Termo de Doação', status: 'pendente', deadline: '30/03/2024' },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Programa Dinheiro Direto na Escola (PDDE)
        </h1>
        <p className="text-gray-600">
          Gestão de recursos descentralizados para manutenção e desenvolvimento da escola
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Recebido</p>
                  <p className="text-2xl font-bold text-gray-900">R$ 35.000</p>
                </div>
                <Coins className="text-green-600" size={24} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Executado</p>
                  <p className="text-2xl font-bold text-gray-900">R$ 28.500</p>
                </div>
                <CheckCircle className="text-blue-600" size={24} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Saldo</p>
                  <p className="text-2xl font-bold text-gray-900">R$ 6.500</p>
                </div>
                <AlertCircle className="text-yellow-600" size={24} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">% Executado</p>
                  <p className="text-2xl font-bold text-gray-900">81.4%</p>
                </div>
                <FileText className="text-purple-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Execução por Categoria</h3>
            <div className="space-y-4">
              {resourceCategories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    <span className="text-sm text-gray-500">
                      R$ {category.spent.toLocaleString('pt-BR')} / R$ {category.allocated.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Documentos Obrigatórios - PDDE</h3>
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
        </div>
      )}
    </div>
  );
}
