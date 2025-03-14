import React, { useState } from 'react';
import { TaskList } from '../components/TaskList';
import { TaskModal } from '../components/TaskModal';
import { TaskProvider } from '../context/TaskContext';

export const TasksPage: React.FC = () => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const handleOpenTaskModal = () => {
    setIsTaskModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false);
  };

  return (
    <TaskProvider>
      <div style={{ padding: '16px' }}>
        <TaskList />
        <div style={{ position: 'fixed', bottom: '20px', left: '16px', right: '16px' }}>
          <button
            style={{
              backgroundColor: '#2AABEE',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '16px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={handleOpenTaskModal}
          >
            <span>New Task</span>
          </button>
        </div>
        <TaskModal open={isTaskModalOpen} onClose={handleCloseTaskModal} />
      </div>
    </TaskProvider>
  );
}; 