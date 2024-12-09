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
  taskOwner: string;
  priority: TaskPriority;
  tags: string;
};

export type NewTask = Omit<Task, "id"> & {
  id?: number;
};

export type ShortTask = Pick<
  Task,
  "id" | "title" | "dueDate" | "status" | "priority"
>;

export type SortType = "asc" | "desc";

export type FilterType = { [field: string]: Array<unknown> };

export type TasksListRequest = {
  sort: { type: SortType; orderBy: keyof Task };
  filters: FilterType;
};

export type TaskView = Omit<Task, "tags"> & {
  tags: Array<string>;
};
