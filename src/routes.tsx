import type { ComponentType, JSX } from 'react';
import { TasksPage } from './pages/TasksPage';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: TasksPage },
];