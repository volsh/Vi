import axios from "axios";
import { TasksListRequest, TaskView } from "../../typings/taskTypes";
import {
  convertTaskToTaskView,
  convertTaskViewToTask,
} from "../utils/taskUtils";

export async function fetchTasks(params: TasksListRequest) {
  try {
    const response = await axios.get("api/tasks", { params });
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function fetchTask(id: number) {
  try {
    const response = await axios.get(`api/tasks/${id}`);
    return convertTaskToTaskView(response.data);
  } catch (err) {
    throw err;
  }
}

export async function createTask(task: TaskView) {
  try {
    const response = await axios.post("api/tasks", convertTaskViewToTask(task));
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function updateTask(task: TaskView) {
  try {
    const response = await axios.put(
      `api/tasks/${task.id}`,
      convertTaskViewToTask(task)
    );
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function deleteTasks(ids: number[]) {
  try {
    const response = await axios.delete("api/tasks", {
      params: { ids: ids.join(",") },
    });
    return { ...response.data, ids };
  } catch (err) {
    throw err;
  }
}
