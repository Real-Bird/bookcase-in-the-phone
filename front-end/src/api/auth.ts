import axios from "axios";

const SERVER_URL = import.meta.env.VITE_REACT_APP_API_URL;
// const SERVER_URL = `http://localhost:8000`;

export async function googleLogin() {
  const data = await axios.get(`${SERVER_URL}/auth/google/callback`, {
    withCredentials: true,
  });
  return data;
}

export async function logout() {
  const res = await axios.get(`${SERVER_URL}/auth/logout`, {
    withCredentials: true,
  });
  console.log(res);
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
