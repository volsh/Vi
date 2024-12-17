import axios from "axios";
import { ListFetchRequest } from "../../@types/common";

export async function fetchTags(params: ListFetchRequest) {
  try {
    const response = await axios.get("api/tags", { params });
    return response.data;
  } catch (err) {
    throw err;
  }
}
