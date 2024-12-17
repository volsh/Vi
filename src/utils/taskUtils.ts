import { format, parse } from "date-fns";
import { Task, TaskView } from "../../@types/task";

export const dateFormat = "yyyy-MM-dd";

export function convertCreationTimeToTaskView(
  taskCreationTime: string
): string {
  try {
    const creationTime = format(
      new Date(taskCreationTime),
      `${dateFormat} hh:mm:ss`
    );
    return creationTime;
  } catch (err) {
    return taskCreationTime;
  }
}

export function convertTaskToTaskView(task: Task): TaskView {
  return {
    ...task,
    dueDate: format(new Date(task.dueDate), dateFormat),
    creationTime: convertCreationTimeToTaskView(task.creationTime),
  } as TaskView;
}

export function convertCreationTimeToTask(viewCreationTime: string): string {
  try {
    const creationTime = parse(
      viewCreationTime.replace("T", " "),
      `${dateFormat} hh:mm:ss`,
      new Date()
    );
    return creationTime.toISOString();
  } catch (err) {
    return viewCreationTime;
  }
}

export function convertTaskViewToTask(task: TaskView): Task {
  return {
    ...task,
    dueDate: format(new Date(task.dueDate), dateFormat),
    creationTime: convertCreationTimeToTask(task.creationTime),
  } as Task;
}
