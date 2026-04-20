export interface TaskItem {
  title: string;
  description: string;
  priority: TaskPrioritiesType;
  createdAt: Date;
}

export const TaskPrioritiesEnum = {
  Low: 0,
  Medium: 1,
  High: 2,
} as const;

export type TaskPrioritiesType = (typeof TaskPrioritiesEnum)[keyof typeof TaskPrioritiesEnum];
