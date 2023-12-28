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

export async function getPublisherAllNews(publisherId: string) {
  const { data } = await axios.get(`${BASE_URL}/news/publisher/${publisherId}`);

  return data as { message: string; data: News[] };
}

export async function likeNewsPost(newsId: string, accountID: string) {
  const { data } = await axios.patch(`${BASE_URL}/news/like/${newsId}`, {
    accountID,
  });

  return data as { value: "like" | "disslike"; message: string; data: News };
}

export async function createNewPost(payload: News) {
  const { data } = await axios.post(`${BASE_URL}/news`, payload);

  return data as { message: string; data: News[] };
}
