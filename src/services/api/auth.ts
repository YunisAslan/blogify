import { RegisterPublisherFormData } from "@/components/RegisterPublisherForm";
import { RegisterUserFormData } from "@/components/RegisterUserForm";
import axios from "axios";

export const BASE_URL = "http://localhost:3000";

export async function getAllUsers() {
  const { data } = await axios.get(`${BASE_URL}/users`);

  return data as User[];
}

export async function createNewUser(payload: RegisterUserFormData) {
  const { data } = await axios.post(`${BASE_URL}/users`, payload);

  return data as User;
}

export async function getAllPublishers() {
  const { data } = await axios.get(`${BASE_URL}/publishers`);

  return data as Publisher[];
}

export async function createNewPublisher(payload: RegisterPublisherFormData) {
  const { data } = await axios.post(`${BASE_URL}/publishers`, payload);

  return data as Publisher;
}