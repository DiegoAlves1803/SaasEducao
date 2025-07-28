import React from 'react';
import StatsCard from './StatsCard';
import { 
  FileText, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  TrendingUp
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
  { month: 'Jan', valor: 45000 },
  { month: 'Fev', valor: 52000 },
  { month: 'Mar', valor: 48000 },
  { month: 'Abr', valor: 61000 },
  { month: 'Mai', valor: 55000 },
  { month: 'Jun', valor: 58000 },
];

const programData = [
  { name: 'PNAE', value: 45, color: '#3B82F6' },
  { name: 'PDDE', value: 25, color: '#10B981' },
  { name: 'FUNDEB', value: 20, color: '#F59E0B' },
  { name: 'Outros', value: 10, color: '#EF4444' },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Visão geral das prestações de contas</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total de Programas"
          value="12"
          change="+2 este mês"
          icon={FileText}
          color="blue"
        />
        <StatsCard
          title="Valor Total Gerenciado"
          value="R$ 284.500"
          change="+12% vs mês anterior"
          icon={DollarSign}
          color="green"
        />
        <StatsCard
          title="Prestações Pendentes"
          value="3"
          icon={AlertTriangle}
          color="yellow"
        />
        <StatsCard
          title="Prestações Aprovadas"
          value="28"
          change="+5 esta semana"
          icon={CheckCircle}
          color="green"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Budget Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Execução Orçamentária Mensal</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, 'Valor']} />
              <Bar dataKey="valor" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Program Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição por Programa</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={programData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {programData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Atividades Recentes</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              {
                action: 'Prestação de contas PNAE aprovada',
                time: 'Há 2 horas',
                status: 'success'
              },
              {
                action: 'Documentos PDDE enviados para análise',
                time: 'Há 4 horas',
                status: 'pending'
              },
              {
                action: 'Relatório FUNDEB gerado',
                time: 'Ontem',
                status: 'info'
              },
              {
                action: 'Prazo PNAE se aproxima (5 dias)',
                time: 'Há 2 dias',
                status: 'warning'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'warning' ? 'bg-yellow-500' :
                  activity.status === 'pending' ? 'bg-blue-500' : 'bg-gray-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
