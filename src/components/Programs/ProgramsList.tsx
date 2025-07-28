import React from 'react';
import { Calendar, DollarSign, FileText, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { mockPrograms } from '../../lib/mockData';

const statusColors = {
  pendente: 'bg-yellow-100 text-yellow-800',
  em_andamento: 'bg-blue-100 text-blue-800',
  concluido: 'bg-green-100 text-green-800',
  atrasado: 'bg-red-100 text-red-800'
};

const statusLabels = {
  pendente: 'Pendente',
  em_andamento: 'Em Andamento',
  concluido: 'Concluído',
  atrasado: 'Atrasado'
};

export default function ProgramsList() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Programas Educacionais</h1>
        <p className="text-gray-600">Gerencie todos os programas e suas prestações de contas</p>
      </div>

      <div className="grid gap-6">
        {mockPrograms.map((program) =&gt; (
          <div key={program.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{program.name}</h3>
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                    {program.code}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{program.description}</p>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[program.status]}`}>
                {statusLabels[program.status]}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Prazo</p>
                  <p className="text-sm font-medium">
                    {format(program.deadline, 'dd/MM/yyyy', { locale: ptBR })}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <DollarSign size={16} className="text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Orçamento</p>
                  <p className="text-sm font-medium">
                    R$ {program.budget.toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <FileText size={16} className="text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Executado</p>
                  <p className="text-sm font-medium">
                    R$ {program.spent.toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Execução Orçamentária</span>
                <span>{((program.spent / program.budget) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(program.spent / program.budget) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Gerenciar Prestação
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                Ver Detalhes
              </button>
            </div>

            {program.status === 'atrasado' && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                <AlertCircle size={16} className="text-red-600" />
                <p className="text-red-800 text-sm">
                  Prestação de contas em atraso. Providencie a documentação o quanto antes.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
