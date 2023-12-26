import axios from "axios";

export const BASE_URL = "http://localhost:6001/api";

export async function getAllNews() {
  const { data } = await axios.get(`${BASE_URL}/news`);

  return data as { message: string; data: News[] };
}

export async function getNewsByID(id: string) {
  const { data } = await axios.get(`${BASE_URL}/news/${id}`);

  return data as { message: string; data: News };
}

export async function createNewPost(payload: News) {
  const { data } = await axios.post(`${BASE_URL}/news`, payload);

  return data as { message: string; data: News[] };
}
