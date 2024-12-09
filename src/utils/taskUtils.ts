import { format, parse } from "date-fns";
import { Task, TaskView } from "../../typings/taskTypes";

export const dateFormat = "yyyy-MM-dd";

export function convertCreationTimeToTaskView(taskCreationTime: string) {
  try {
    const creationTime = format(
      new Date(taskCreationTime),
      `${dateFormat} hh:mm:ss`
    );
    return creationTime;
  } catch (err) {
    throw err;
  }
}

export function convertTaskToTaskView(task: Task): TaskView {
  try {
    return {
      ...task,
      dueDate: format(new Date(task.dueDate), dateFormat),
      creationTime: format(
        new Date(task.creationTime),
        `${dateFormat} hh:mm:ss`
      ),
      tags: task.tags?.split(","),
    } as TaskView;
  } catch (err) {
    return { ...task, tags: task.tags?.split(",") } as TaskView;
  }
}

export function convertCreationTimeToTask(viewCreationTime: string) {
  try {
    const creationTime = parse(
      viewCreationTime.replace("T", " "),
      `${dateFormat} hh:mm:ss`,
      new Date()
    );
    return creationTime;
  } catch (err) {
    throw err;
  }
}

export function convertTaskViewToTask(task: TaskView): Task {
  try {
    const creationTime = convertCreationTimeToTask(task.creationTime);
    return {
      ...task,
      dueDate: format(new Date(task.dueDate), dateFormat),
      creationTime: creationTime.toISOString(),
      tags: task.tags?.join(","),
    } as Task;
  } catch (err) {
    return { ...task, tags: task.tags?.join(",") } as Task;
  }
}
