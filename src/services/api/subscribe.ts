import axios from "axios";

export async function getAllSubscriptions() {
  const { data } = await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/subscriptions`);

  return data as { message: string; data: Subscription[] };
}

export async function createNewSubscription(payload: Subscription) {
  const { data } = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/api/subscriptions`, payload);

  return data as { message: string; data: Subscription };
}

export async function deleteSubscription(
  id: string,
  payload: { userId: string }
) {
  const { data } = await axios.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/api/subscriptions/${id}`, {
    data: payload,
  });

  return data as { message: string; data: Subscription[] };
}
