
import React, { useState } from 'react';
import KanbanBoard from '@/components/KanbanBoard';
import SearchBar from '@/components/SearchBar';
import TaskModal from '@/components/TaskModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useTasks } from '@/hooks/useTasks';

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { tasks, addTask, updateTask, deleteTask } = useTasks();

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-4xl font-bold">Kanban</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
            />
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nova atividade
            </Button>
          </div>
        </div>

        {/* Kanban Board */}
        <KanbanBoard 
          tasks={filteredTasks}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
        />

        {/* Task Modal */}
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={addTask}
        />
      </div>
    </div>
  );
};

export default Index;
