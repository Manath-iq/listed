import React from 'react';
import { Task } from '../models/Task';
import { useTaskContext } from '../context/TaskContext';
import { Cell, Checkbox } from '@telegram-apps/telegram-ui';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTaskStatus } = useTaskContext();

  return (
    <Cell
      before={
        <Checkbox
          checked={task.completed}
          onChange={() => toggleTaskStatus(task.id)}
        />
      }
      subtitle={task.description}
    >
      {task.title}
    </Cell>
  );
}; 