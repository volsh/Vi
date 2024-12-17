import axios, { AxiosError } from "axios";
import { Task } from "../../@types/task";
import { convertTaskToTaskView } from "../utils/taskUtils";
import { ListFetchRequest } from "../../@types/common";

export async function fetchTasks(
  params?: ListFetchRequest
): Promise<Task[] | AxiosError> {
  try {
    const response = await axios.get("api/tasks", { params });
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function fetchTask(id: number, abortController?: AbortController) {
  try {
    const response = await axios.get(`api/tasks/${id}`, {
      signal: abortController?.signal,
    });
    return convertTaskToTaskView(response.data);
  } catch (err) {
    throw err;
  }
}

export async function createTask(task: Task) {
  try {
    const response = await axios.post("api/tasks", task);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function updateTask(task: Task) {
  try {
    const response = await axios.put(`api/tasks/${task.id}`, task);
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
