
import React from 'react';
import KanbanColumn from './KanbanColumn';
import { Task, TaskStatus } from '@/hooks/useTasks';

interface KanbanBoardProps {
  tasks: Task[];
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const columns: { status: TaskStatus; title: string; color: string }[] = [
    { status: 'pending', title: 'Pendente', color: 'bg-red-600' },
    { status: 'in-progress', title: 'Realizando', color: 'bg-purple-600' },
    { status: 'completed', title: 'Concluída', color: 'bg-green-600' },
  ];

  const getTasksByStatus = (status: TaskStatus) => 
    tasks.filter(task => task.status === status)
         .sort((a, b) => {
           const priorityOrder = { high: 3, medium: 2, low: 1 };
           return priorityOrder[b.priority] - priorityOrder[a.priority];
         });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {columns.map(column => (
        <KanbanColumn
          key={column.status}
          title={column.title}
          color={column.color}
          tasks={getTasksByStatus(column.status)}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
