import { RegisterPublisherFormData } from "@/components/RegisterPublisherForm";
import { RegisterUserFormData } from "@/components/RegisterUserForm";
import { LoginFormData } from "@/pages/login";
import axios from "axios";

export const BASE_URL = "http://localhost:6001/api";

// USERS

export async function getAllUsers() {
  const { data } = await axios.get(`${BASE_URL}/users`);

  return data as { message: string; data: User[] };
}

export async function getUserByID(id: string) {
  const { data } = await axios.get(`${BASE_URL}/users/${id}`);

  return data as { message: string; data: User };
}

export async function createNewUser(payload: RegisterUserFormData) {
  const { data } = await axios.post(`${BASE_URL}/users`, payload);

  return data as { message: string; data: User };
}

// PUBLISHERS

export async function getAllPublishers() {
  const { data } = await axios.get(`${BASE_URL}/publishers`);

  return data as { message: string; data: Publisher[] };
}

export async function getPublisherByID(id: string) {
  const { data } = await axios.get(`${BASE_URL}/publishers/${id}`);

  return data as { message: string; data: Publisher };
}

export async function createNewPublisher(payload: RegisterPublisherFormData) {
  const { data } = await axios.post(`${BASE_URL}/publishers`, payload);

  return data as { message: string; data: Publisher };
}

// PUBLISHERS & USERS
export async function loginWithUserAccount(payload: LoginFormData) {
  const { data } = await axios.post(`${BASE_URL}/users/login`, payload);

  return data as { success: boolean; message: string; data: User };
}

export async function loginWithPublisherAccount(payload: LoginFormData) {
  const { data } = await axios.post(`${BASE_URL}/publishers/login`, payload);

  return data as { success: boolean; message: string; data: Publisher };
}
