export interface TaskItem {
  id: string;
  title: string;
  description: string;
  priority: TaskPrioritiesType;
  isCompleted: boolean;
  createdAt: Date;
  completedAt: Date | null;
}

export const TaskPrioritiesEnum = {
  Low: 0,
  Medium: 1,
  High: 2,
} as const;

export type TaskPrioritiesType = (typeof TaskPrioritiesEnum)[keyof typeof TaskPrioritiesEnum];
