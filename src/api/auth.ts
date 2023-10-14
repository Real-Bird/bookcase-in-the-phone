import axios, { AxiosError } from "axios";
import { LEGACY_TOKEN_KEY, SERVER_URL, TOKEN_KEY } from "constants/auth";

export async function login() {
  const { data } = await axios.get<LoginResponse>(`${SERVER_URL}/auth/login`, {
    withCredentials: true,
  });
  return { error: data.error, message: data.message };
}

export async function logout() {
  await axios.get(`${SERVER_URL}/auth/logout`, {
    withCredentials: true,
  });
  localStorage.removeItem(TOKEN_KEY);
  return true;
}

export async function disconnect() {
  await axios.get(`${SERVER_URL}/auth/disconnect`, {
    withCredentials: true,
  });
  localStorage.removeItem(TOKEN_KEY);
  return true;
}

export async function checkedUser() {
  localStorage.removeItem(LEGACY_TOKEN_KEY);
  const token = localStorage.getItem(TOKEN_KEY);
  try {
    const { data } = await axios.get<CheckedResponse>(
      `${SERVER_URL}/auth/check`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.userInfo.newAccessToken) {
      window.localStorage.setItem(TOKEN_KEY, data.userInfo.newAccessToken);
    }
    return {
      error: data.error,
      message: data.message,
      isLogged: true,
      username: data.userInfo.username,
    };
  } catch (e) {
    const { response } = e as AxiosError<CommonResponse>;
    window.localStorage.removeItem(TOKEN_KEY);
    return {
      error: response?.data.error,
      message: response?.data.message,
      isLogged: false,
      username: "",
    };
  }
}

type CommonResponse = {
  error: boolean;
  message: string;
};

type LoginResponse = {
  accessToken: string;
} & CommonResponse;

type CheckedResponse = {
  userInfo: {
    username: string;
    newAccessToken?: string;
  };
} & CommonResponse;
