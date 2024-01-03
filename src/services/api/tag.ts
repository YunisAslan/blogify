import axios from "axios";


export async function getAllTags() {
  const { data } = await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/tags`);

  return data as { message: string; data: Tag[] };
}

export async function getAllTagsByNewsID(newsId: string) {
  const { data } = await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/tags/news/${newsId}`);

  return data as { message: string; data: Tag[] };
}

export async function createNewTag(payload: Tag) {
  const { data } = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/api/tags`, payload);

  return data as { message: string; data: Tag };
}
