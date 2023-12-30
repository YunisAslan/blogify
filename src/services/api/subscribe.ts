import axios from "axios";

export const BASE_URL = "http://localhost:6001/api";

export async function getAllSubscriptions() {
  const { data } = await axios.get(`${BASE_URL}/subscriptions`);

  return data as { message: string; data: Subscription[] };
}

export async function createNewSubscription(payload: Subscription) {
  const { data } = await axios.post(`${BASE_URL}/subscriptions`, payload);

  return data as { message: string; data: Subscription[] };
}

export async function deleteSubscription(id: string) {
  const { data } = await axios.delete(`${BASE_URL}/subscriptions/${id}`);

  return data as { message: string; data: Subscription[] };
}
