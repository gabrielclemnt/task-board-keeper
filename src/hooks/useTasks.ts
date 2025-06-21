
import { useState } from 'react';

export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  updatedAt: Date;
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Tablet view',
      description: 'Criar interface responsiva para tablets',
      status: 'pending',
      priority: 'high',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'Audio recording in note',
      description: 'Show audio in a note and playback UI',
      status: 'pending',
      priority: 'high',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      title: 'Bookmark in note',
      description: 'Show rich link UI in a note, and feature to render website screenshot.',
      status: 'pending',
      priority: 'low',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      title: 'Mobile view',
      description: 'Functions for both web responsive and native apps. Note: Android and iOS will need unique share icons.',
      status: 'in-progress',
      priority: 'medium',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '5',
      title: 'Desktop view',
      description: 'PWA for website and native apps. Note: Windows and Mac will need unique share icons.',
      status: 'in-progress',
      priority: 'medium',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '6',
      title: 'Audio recording',
      description: 'Interface for when recording a new audio note',
      status: 'completed',
      priority: 'low',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '7',
      title: 'Bookmarking',
      description: 'Interface for when creating a new link note.',
      status: 'completed',
      priority: 'low',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
  };
};
