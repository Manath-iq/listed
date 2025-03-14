import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Task } from '../models/Task';
import { v4 as uuidv4 } from 'uuid';

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, description?: string) => void;
  updateTask: (taskId: string, title: string, description?: string) => void;
  deleteTask: (taskId: string) => void;
  toggleTaskStatus: (taskId: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string, description?: string) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      completed: false,
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (taskId: string, title: string, description?: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              title,
              description,
              updatedAt: new Date(),
            }
          : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              updatedAt: new Date(),
            }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}; 