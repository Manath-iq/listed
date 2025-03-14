import React from 'react';
import { TaskItem } from './TaskItem';
import { useTaskContext } from '../context/TaskContext';
import { List } from '@telegram-apps/telegram-ui';

export const TaskList: React.FC = () => {
  const { tasks } = useTaskContext();

  return (
    <div>
      <List>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </List>
    </div>
  );
}; 