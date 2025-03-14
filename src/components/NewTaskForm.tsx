import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Button, Input } from '@telegram-apps/telegram-ui';

interface NewTaskFormProps {
  onClose: () => void;
}

export const NewTaskForm: React.FC<NewTaskFormProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addTask } = useTaskContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title, description.trim() || undefined);
      setTitle('');
      setDescription('');
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 8 }}>Заголовок</div>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введите заголовок задачи"
          autoFocus
          required
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 8 }}>Описание</div>
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Введите описание задачи (опционально)"
        />
      </div>
      <Button
        size="m"
        mode="filled"
        stretched
        type="submit"
        style={{ marginTop: 16 }}
      >
        Добавить задачу
      </Button>
    </form>
  );
}; 