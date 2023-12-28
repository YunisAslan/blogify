import axios from "axios";

export const BASE_URL = "http://localhost:6001/api";

export async function getAllTags() {
  const { data } = await axios.get(`${BASE_URL}/tags`);

  return data as { message: string; data: Tag[] };
}

export async function getAllTagsByNewsID(newsId: string) {
  const { data } = await axios.get(`${BASE_URL}/tags/news/${newsId}`);

  return data as { message: string; data: Tag[] };
}

export async function createNewTag(payload: Tag) {
  const { data } = await axios.post(`${BASE_URL}/tags`, payload);

  return data as { message: string; data: Tag };
}
