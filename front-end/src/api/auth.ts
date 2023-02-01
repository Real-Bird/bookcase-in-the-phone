import axios from "axios";

const SERVER_URL = import.meta.env.VITE_REACT_APP_API_URL;

export async function googleLogin() {
  const data = await axios.get(`${SERVER_URL}/auth/login/success`, {
    withCredentials: true,
  });
  return data;
}

export async function logout() {
  await axios.get(`${SERVER_URL}/auth/logout`, { withCredentials: true });
  return;
}

export async function checkedUser() {
  const token = getUserToken("BiPToken");
  if (!token) return false;
  const { data } = await axios.get(`${SERVER_URL}/auth/check?token=${token}`, {
    withCredentials: true,
  });
  return data;
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
