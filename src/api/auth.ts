import axios from "axios";
import { SERVER_URL, TOKEN_KEY } from "constants/auth";
import Cookies from "js-cookie";

const token = Cookies.get();

export async function login() {
  console.log(token);
  if (!token[TOKEN_KEY]) return;
  const data = await axios.get(`${SERVER_URL}/auth/login`, {
    withCredentials: true,
  });
  console.log(data);
  return data;
}

export async function logout() {
  await axios.get(`${SERVER_URL}/auth/logout`, {
    withCredentials: true,
  });
  return true;
}

export async function checkedUser() {
  const res = await axios.get(`${SERVER_URL}/auth/check`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res);
  return { user: null };
}

export function hasUserToken(key: string) {
  if (!localStorage.getItem(key)) return false;
  return true;
}

export function getUserToken(key: string) {
  const value = localStorage.getItem(key);
  if (!value) return;
  return value;
}
