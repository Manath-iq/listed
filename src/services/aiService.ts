import { Task } from '../models/Task';

// Имитация SDK для работы с ИИ
export class AiService {
  static async generateTasks(context: Task): Promise<Task[]> {
    // В реальном приложении здесь был бы вызов SDK
    // Возвращаем имитацию ответа от ИИ
    return new Promise((resolve) => {
      setTimeout(() => {
        const generatedTasks: Task[] = [
          {
            id: 'ai-1',
            title: `Подготовиться к ${context.title}`,
            completed: false,
            createdAt: new Date(),
          },
          {
            id: 'ai-2',
            title: `Проверить материалы для ${context.title}`,
            completed: false,
            createdAt: new Date(),
          },
          {
            id: 'ai-3',
            title: `Запланировать время для ${context.title}`,
            completed: false,
            createdAt: new Date(),
          },
        ];
        resolve(generatedTasks);
      }, 1000);
    });
  }
}