import React from 'react';
import { NewTaskForm } from './NewTaskForm';

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div 
        style={{ 
          backgroundColor: 'white', 
          borderRadius: '14px', 
          width: '90%', 
          maxWidth: '400px',
          padding: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>
          Новая задача
        </div>
        <NewTaskForm onClose={onClose} />
      </div>
    </div>
  );
}; 