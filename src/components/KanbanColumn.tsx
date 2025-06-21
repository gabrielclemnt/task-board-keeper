
import React from 'react';
import TaskCard from './TaskCard';
import { Task } from '@/hooks/useTasks';

interface KanbanColumnProps {
  title: string;
  color: string;
  tasks: Task[];
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ 
  title, 
  color, 
  tasks, 
  onUpdateTask, 
  onDeleteTask 
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-4 h-4 rounded ${color}`}></div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-sm">
          {tasks.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
        
        {tasks.length === 0 && (
          <div className="text-gray-500 text-center py-8 text-sm">
            Nenhuma atividade
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
