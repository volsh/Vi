import { atom, selector } from "recoil";
import { ListFetchRequest } from "../../@types/common";
import { fetchTasks } from "../api/tasksApi";

export const tasksRequest = atom<ListFetchRequest>({
  key: "tasksRequest",
  default: { sort: { field: "id", type: "asc" } },
});

export const tasksQuery = selector({
  key: "tasks",
  get: async ({ get }) => {
    const params = get(tasksRequest);
    try {
      const response = await fetchTasks(params);
      return response;
    } catch (error) {
      console.log(`failed to load tasks - ${error}`);
      throw error;
    }
  },
});
