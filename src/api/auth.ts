import { AxiosError } from "axios";
import axios from "@api/httpClient";
import { LEGACY_TOKEN_KEY, TOKEN_KEY } from "constants/auth";

export async function login() {
  const { data } = await axios.get<LoginResponse>("/auth/login");
  return { error: data.error, message: data.message };
}

export async function logout() {
  await axios.get("/auth/logout");
  localStorage.removeItem(TOKEN_KEY);
  return true;
}

export async function disconnect() {
  await axios.get("/auth/disconnect");
  localStorage.removeItem(TOKEN_KEY);
  return true;
}

export async function checkedUser() {
  localStorage.removeItem(LEGACY_TOKEN_KEY);
  try {
    const { data } = await axios.get<CheckedResponse>("/auth/check");
    if (data.userInfo.newAccessToken) {
      localStorage.setItem(TOKEN_KEY, data.userInfo.newAccessToken);
    }
    return {
      error: data.error,
      message: data.message,
      isLogged: true,
      username: data.userInfo.username,
    };
  } catch (e) {
    const { response } = e as AxiosError<CommonResponse>;
    localStorage.removeItem(TOKEN_KEY);
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
