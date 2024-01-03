import axios from "axios";
import Cookies from "js-cookie";

export async function getAllNews() {
  const token = await Cookies.get("token");

  const { data } = await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/news`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data as { message: string; data: News[] };
}

export async function getNewsByID(id: string) {
  const token = await Cookies.get("token");

  const { data } = await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/news/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data as { message: string; data: News };
}

export async function getPublisherAllNews(publisherId: string) {
  const { data } = await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/news/publisher/${publisherId}`);

  return data as { message: string; data: News[] };
}

export async function likeNewsPost(newsId: string, accountID: string) {
  const { data } = await axios.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/news/like/${newsId}`, {
    accountID,
  });

  return data as { value: "like" | "disslike"; message: string; data: News };
}

export async function createNewPost(payload: News) {
  const { data } = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/api/news`, payload);

  return data as { message: string; data: News[] };
}
