import axios from "axios";

export const BASE_URL = "http://localhost:6001/api";

export async function getAllNews() {
  const { data } = await axios.get(`${BASE_URL}/news`);

  return data as { message: string; data: News[] };
}
