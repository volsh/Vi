import { User } from "./user";

export const StatusTypes = ["Completed", "To Do", "In Progress"] as const;

export type TaskStatus = (typeof StatusTypes)[number];

export const PriorityTypes = ["Low", "Medium", "High", "Critical"] as const;

export type TaskPriority = (typeof PriorityTypes)[number];

export type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  creationTime: string;
  priority: TaskPriority;
  taskOwnerId: number;
  taskOwner: Pick<User, "id" | "name">;
  tagIds?: number[];
  tags?: Array<Pick<User, "id" | "name">>;
};

export type NewTask = Omit<Task, "id">;

export type TaskView = Task;
