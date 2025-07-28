import React, { useState, useMemo } from 'react';
import { Calendar, Clock, AlertTriangle, CheckCircle, Filter } from 'lucide-react';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, getDay, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { mockDeadlines } from '../../lib/mockData';

export default function DeadlineCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState('todos');

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startingDayIndex = getDay(monthStart);

  const filteredDeadlines = useMemo(() =&gt; {
    return mockDeadlines.filter(deadline =&gt; {
        if (filter === 'todos') return true;
        return deadline.status === filter;
    });
  }, [filter]);

  const getDeadlinesForDate = (date: Date) =&gt; {
    return filteredDeadlines.filter(deadline =&gt; isSameDay(deadline.date, date));
  };

  const getPriorityColor = (priority: string) =&gt; {
    switch (priority) {
      case 'alta': return 'bg-red-500';
      case 'media': return 'bg-yellow-500';
      case 'baixa': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) =&gt; {
    switch (status) {
      case 'concluido': return 'bg-green-100 text-green-800';
      case 'atrasado': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const upcomingDeadlines = filteredDeadlines
    .filter(deadline =&gt; deadline.date >= new Date())
    .sort((a, b) =&gt; a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Calendário de Prazos</h1>
        <p className="text-gray-600">Acompanhe todos os prazos importantes de prestação de contas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 capitalize">
                {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =&gt; setCurrentDate(addMonths(currentDate, -1))}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  &#8249;
                </button>
                <button
                  onClick={() =&gt; setCurrentDate(addMonths(currentDate, 1))}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  &#8250;
                </button>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-7 gap-1 mb-2 text-center text-sm font-medium text-gray-500">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day =&gt; (
                <div key={day}>{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: startingDayIndex }).map((_, index) =&gt; (
                <div key={`empty-${index}`} className="border rounded-lg border-transparent"></div>
              ))}
              {daysInMonth.map(day =&gt; {
                const dayDeadlines = getDeadlinesForDate(day);
                return (
                  <button
                    key={day.toString()}
                    onClick={() =&gt; setSelectedDate(day)}
                    className={`h-20 p-2 text-sm relative flex flex-col items-start border rounded-lg transition-colors ${
                      isSameDay(day, selectedDate) ? 'bg-blue-100 border-blue-300' : 'border-gray-200 hover:bg-gray-50'
                    } ${!isSameMonth(day, currentDate) ? 'text-gray-400' : 'text-gray-900'}`}
                  >
                    <span className={`font-medium ${isToday(day) ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}`}>
                        {format(day, 'd')}
                    </span>
                    {dayDeadlines.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {dayDeadlines.slice(0, 3).map((deadline, index) =&gt; (
                          <div
                            key={index}
                            className={`w-1.5 h-1.5 rounded-full ${getPriorityColor(deadline.priority)}`}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Prazos para {format(selectedDate, 'dd/MM/yyyy')}</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {getDeadlinesForDate(selectedDate).length > 0 ? getDeadlinesForDate(selectedDate).map(deadline =&gt; (
                   <div key={deadline.id} className="p-3 border border-gray-200 rounded-lg">
                     <div className="flex items-start justify-between mb-2">
                       <div className="flex items-center space-x-2">
                         <div className={`w-2 h-2 rounded-full ${getPriorityColor(deadline.priority)}`}></div>
                         <span className="text-xs text-gray-500">{deadline.program}</span>
                       </div>
                       <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(deadline.status)}`}>
                         {deadline.status}
                       </span>
                     </div>
                     <h4 className="font-medium text-gray-900 text-sm">{deadline.title}</h4>
                   </div>
                )) : <p className="text-sm text-gray-500">Nenhum prazo para esta data.</p>}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Próximos Prazos</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline) =&gt; (
                  <div key={deadline.id} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(deadline.priority)}`}></div>
                        <span className="text-xs text-gray-500">{deadline.program}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(deadline.status)}`}>
                        {deadline.status}
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-900 text-sm mb-1">{deadline.title}</h4>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock size={12} />
                      <span>{format(deadline.date, 'dd/MM/yyyy', { locale: ptBR })}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
