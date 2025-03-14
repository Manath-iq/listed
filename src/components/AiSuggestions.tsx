import React, { useState, useEffect } from 'react';
import { Task } from '../models/Task';
import { AiService } from '../services/aiService';
import { useTaskContext } from '../context/TaskContext';
import { List, Checkbox, Button } from '@telegram-apps/telegram-ui';

interface AiSuggestionsProps {
  contextTask: Task;
  onClose: () => void;
}

export const AiSuggestions: React.FC<AiSuggestionsProps> = ({ contextTask, onClose }) => {
  const [suggestions, setSuggestions] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTasks, setSelectedTasks] = useState<Record<string, boolean>>({});
  const { addTask } = useTaskContext();

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const tasks = await AiService.generateTasks(contextTask);
        setSuggestions(tasks);
        const initialSelected = tasks.reduce((acc, task) => {
          acc[task.id] = true;
          return acc;
        }, {} as Record<string, boolean>);
        setSelectedTasks(initialSelected);
      } catch (error) {
        console.error('Error fetching AI suggestions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [contextTask]);

  const handleToggleTask = (taskId: string) => {
    setSelectedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const handleAddSelected = () => {
    suggestions.forEach((task) => {
      if (selectedTasks[task.id]) {
        addTask(task.title, task.description);
      }
    });
    onClose();
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Загрузка предложений...</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ margin: '0 0 8px 0' }}>Предложения на основе задачи:</h3>
        <div style={{ fontWeight: 'bold' }}>{contextTask.title}</div>
      </div>

      <List>
        {suggestions.map((task) => (
          <div
            key={task.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 16px',
              borderBottom: '1px solid #eee',
            }}
          >
            <Checkbox
              checked={selectedTasks[task.id] || false}
              onChange={() => handleToggleTask(task.id)}
            />
            <div style={{ marginLeft: '12px' }}>{task.title}</div>
          </div>
        ))}
      </List>

      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <Button
          size="m"
          mode="filled"
          stretched
          onClick={handleAddSelected}
        >
          Добавить выбранные
        </Button>
        <Button
          size="m"
          mode="outline"
          stretched
          onClick={onClose}
        >
          Отмена
        </Button>
      </div>
    </div>
  );
}; 