import React, { useState } from 'react';
import { GraduationCap, FileText, Users, Calculator, Calendar } from 'lucide-react';

export default function FUNDEB() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: GraduationCap },
    { id: 'distribution', label: 'Distribuição', icon: Calculator },
    { id: 'application', label: 'Aplicação', icon: FileText },
    { id: 'control', label: 'Controle Social', icon: Users },
    { id: 'reports', label: 'Relatórios', icon: Calendar },
  ];

  const distributionData = [
    { category: 'Remuneração dos Profissionais da Educação', percentage: 70, amount: 1260000 },
    { category: 'Outras Despesas de MDE', percentage: 30, amount: 540000 },
  ];

  const applicationAreas = [
    { name: 'Educação Infantil', students: 450, value: 360000 },
    { name: 'Ensino Fundamental - Anos Iniciais', students: 850, value: 680000 },
    { name: 'Ensino Fundamental - Anos Finais', students: 620, value: 496000 },
    { name: 'Ensino Médio', students: 380, value: 304000 },
    { name: 'EJA', students: 150, value: 120000 },
    { name: 'Educação Especial', students: 80, value: 64000 },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Fundo de Manutenção e Desenvolvimento da Educação Básica (FUNDEB)
        </h1>
        <p className="text-gray-600">
          Gestão e prestação de contas do principal mecanismo de financiamento da educação básica
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
                  <p className="text-sm text-gray-600">Receita Total</p>
                  <p className="text-2xl font-bold text-gray-900">R$ 1.8M</p>
                </div>
                <GraduationCap className="text-green-600" size={24} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total de Alunos</p>
                  <p className="text-2xl font-bold text-gray-900">2.530</p>
                </div>
                <Users className="text-blue-600" size={24} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Valor/Aluno/Ano</p>
                  <p className="text-2xl font-bold text-gray-900">R$ 4.500</p>
                </div>
                <Calculator className="text-purple-600" size={24} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">% Magistério</p>
                  <p className="text-2xl font-bold text-gray-900">72%</p>
                </div>
                <FileText className="text-orange-600" size={24} />
              </div>
            </div>
          </div>

          {/* Distribution Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição dos Recursos</h3>
            <div className="space-y-4">
              {distributionData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700">{item.category}</span>
                    <span className="text-sm text-gray-500">
                      {item.percentage}% - R$ {item.amount.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${index === 0 ? 'bg-green-600' : 'bg-blue-600'}`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Application Tab */}
      {activeTab === 'application' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Aplicação por Etapa/Modalidade</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {applicationAreas.map((area, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-900">{area.name}</h4>
                      <span className="text-sm text-gray-600">{area.students} alunos</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Valor: R$ {area.value.toLocaleString('pt-BR')}</span>
                      <span>Por aluno: R$ {(area.value / area.students).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Control Tab */}
      {activeTab === 'control' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Conselho de Acompanhamento</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Próximas Reuniões</h4>
                  <div className="space-y-3">
                    {[
                      { date: '15/02/2024', topic: 'Análise da Execução Janeiro' },
                      { date: '15/03/2024', topic: 'Prestação de Contas 1º Trimestre' },
                      { date: '15/04/2024', topic: 'Planejamento 2º Trimestre' },
                    ].map((meeting, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-sm text-gray-900">{meeting.topic}</p>
                        <p className="text-xs text-gray-600">{meeting.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Atas e Pareceres</h4>
                  <div className="space-y-3">
                    {[
                      { title: 'Ata da Reunião - Janeiro 2024', status: 'Aprovada' },
                      { title: 'Parecer sobre Execução - Janeiro', status: 'Pendente' },
                      { title: 'Relatório de Acompanhamento', status: 'Em análise' },
                    ].map((document, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-900">{document.title}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          document.status === 'Aprovada' ? 'bg-green-100 text-green-800' :
                          document.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {document.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
