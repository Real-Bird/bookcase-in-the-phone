import axios, { AxiosError } from "axios";
import { SERVER_URL, TOKEN_KEY } from "constants/auth";

export async function login() {
  const { status, data } = await axios.get<LoginResponse>(
    `${SERVER_URL}/auth/login`,
    {
      withCredentials: true,
    }
  );
  if (status === 200) {
    window.localStorage.setItem(TOKEN_KEY, data.accessToken);
  }
  return { error: data.error, message: data.message };
}

export async function logout() {
  await axios.get(`${SERVER_URL}/auth/logout`, {
    withCredentials: true,
  });
  return true;
}

export async function checkedUser() {
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
      user: data.userInfo.username,
      isLogged: true,
    };
  } catch (e) {
    const { response } = e as AxiosError<CommonResponse>;
    window.localStorage.removeItem(TOKEN_KEY);
    return {
      error: response?.data.error,
      message: response?.data.message,
      isLogged: false,
    };
  }
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
