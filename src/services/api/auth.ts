import { RegisterPublisherFormData } from "@/components/RegisterPublisherForm";
import { RegisterUserFormData } from "@/components/RegisterUserForm";
import { LoginFormData } from "@/pages/login";
import axios from "axios";

// USERS

export async function getAllUsers() {
  const { data } = await axios.get(
    `${import.meta.env.VITE_SERVER_BASE_URL}/api/users`
  );

  return data as { message: string; data: User[] };
}

export async function getUserByID(id: string) {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}/api/users/${id}`
    );
    return data as { message: string; data: User };
  } catch (error) {
    // console.error("Error fetching user by ID:", error);
  }
}

export async function createNewUser(payload: RegisterUserFormData) {
  const { data } = await axios.post(
    `${import.meta.env.VITE_SERVER_BASE_URL}/api/users`,
    payload
  );

  return data as { message: string; data: User };
}

// PUBLISHERS

export async function getAllPublishers() {
  const { data } = await axios.get(
    `${import.meta.env.VITE_SERVER_BASE_URL}/api/publishers`
  );

  return data as { message: string; data: Publisher[] };
}

export async function getPublisherByID(id: string) {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}/api/publishers/${id}`
    );
    return data as { message: string; data: Publisher };
  } catch (error) {
    // console.error("Error fetching publisher by ID:", error);
  }
}

export async function createNewPublisher(payload: RegisterPublisherFormData) {
  const { data } = await axios.post(
    `${import.meta.env.VITE_SERVER_BASE_URL}/api/publishers`,
    payload
  );

  return data as { message: string; data: Publisher };
}

// PUBLISHERS & USERS
export async function loginWithUserAccount(payload: LoginFormData) {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}/api/users/login`,
      payload
    );

    return data as {
      success: boolean;
      message: string;
      data: User;
      token?: string;
    };
  } catch (err) {
    // console.error(err);
  }
}

export async function loginWithPublisherAccount(payload: LoginFormData) {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}/api/publishers/login`,
      payload
    );

    return data as {
      success: boolean;
      message: string;
      data: Publisher;
      token?: string;
    };
  } catch (err) {
    // console.error(err);
  }
}
