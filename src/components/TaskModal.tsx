
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Task, TaskStatus, TaskPriority } from '@/hooks/useTasks';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialTask?: Task;
  isEditing?: boolean;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialTask,
  isEditing = false,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('pending');
  const [priority, setPriority] = useState<TaskPriority>('medium');

  useEffect(() => {
    if (initialTask && isEditing) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setStatus(initialTask.status);
      setPriority(initialTask.priority);
    } else {
      setTitle('');
      setDescription('');
      setStatus('pending');
      setPriority('medium');
    }
  }, [initialTask, isEditing, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
    });

    if (!isEditing) {
      setTitle('');
      setDescription('');
      setStatus('pending');
      setPriority('medium');
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-600 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Atividade' : 'Nova Atividade'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-gray-300">
              Título *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título da atividade..."
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-gray-300">
              Descrição
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva a atividade..."
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status" className="text-gray-300">
                Status
              </Label>
              <Select value={status} onValueChange={(value: TaskStatus) => setStatus(value)}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="pending" className="text-white hover:bg-gray-700">
                    Pendente
                  </SelectItem>
                  <SelectItem value="in-progress" className="text-white hover:bg-gray-700">
                    Realizando
                  </SelectItem>
                  <SelectItem value="completed" className="text-white hover:bg-gray-700">
                    Concluída
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority" className="text-gray-300">
                Prioridade
              </Label>
              <Select value={priority} onValueChange={(value: TaskPriority) => setPriority(value)}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="high" className="text-white hover:bg-gray-700">
                    Alta
                  </SelectItem>
                  <SelectItem value="medium" className="text-white hover:bg-gray-700">
                    Média
                  </SelectItem>
                  <SelectItem value="low" className="text-white hover:bg-gray-700">
                    Baixa
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isEditing ? 'Salvar Alterações' : 'Criar Atividade'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
