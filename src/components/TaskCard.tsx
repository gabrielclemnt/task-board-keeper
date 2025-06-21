
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Edit, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import TaskModal from './TaskModal';
import { Task, TaskStatus } from '@/hooks/useTasks';

interface TaskCardProps {
  task: Task;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdateTask, onDeleteTask }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 hover:bg-red-600';
      case 'medium': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'low': return 'bg-green-500 hover:bg-green-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return priority;
    }
  };

  const getNextStatus = (): TaskStatus | null => {
    switch (task.status) {
      case 'pending': return 'in-progress';
      case 'in-progress': return 'completed';
      default: return null;
    }
  };

  const getPrevStatus = (): TaskStatus | null => {
    switch (task.status) {
      case 'completed': return 'in-progress';
      case 'in-progress': return 'pending';
      default: return null;
    }
  };

  const handleStatusChange = (newStatus: TaskStatus) => {
    onUpdateTask(task.id, { status: newStatus });
  };

  const handleEdit = (updatedTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    onUpdateTask(task.id, updatedTask);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <Card className="bg-gray-700 border-gray-600 p-4 hover:bg-gray-650 transition-colors group">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-white text-sm line-clamp-2">{task.title}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 border-gray-600">
              <DropdownMenuItem 
                onClick={() => setIsEditModalOpen(true)}
                className="text-gray-300 hover:text-white hover:bg-gray-700"
              >
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDeleteTask(task.id)}
                className="text-red-400 hover:text-red-300 hover:bg-gray-700"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{task.description}</p>

        <div className="flex justify-between items-center">
          <Badge className={getPriorityColor(task.priority)}>
            {getPriorityLabel(task.priority)}
          </Badge>

          <div className="flex gap-2">
            {getPrevStatus() && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleStatusChange(getPrevStatus()!)}
                className="text-gray-400 hover:text-white p-1 h-8 w-8"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            {getNextStatus() && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleStatusChange(getNextStatus()!)}
                className="text-gray-400 hover:text-white p-1 h-8 w-8"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </Card>

      <TaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEdit}
        initialTask={task}
        isEditing
      />
    </>
  );
};

export default TaskCard;
