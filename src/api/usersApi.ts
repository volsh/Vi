import axios from "axios";
import { ListFetchRequest } from "../../@types/common";

export async function fetchUsers(params: ListFetchRequest) {
  try {
    const response = await axios.get("api/users", { params });
    return response.data;
  } catch (err) {
    throw err;
  }
}
