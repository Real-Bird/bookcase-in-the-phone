import { SlicePattern, create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export enum UserActionTypes {
  SET_USER = "SET_USER",
}

const createUesrSlice: SlicePattern<UserSlice> = (set) => ({
  username: "",
  setUsername: (payload) =>
    set((state) => {
      state.username = payload;
    }),
});

const UserBoundStore = create<UserSlice>()(
  devtools(immer((...a) => ({ ...createUesrSlice(...a) })))
);

export const useUserState = () => UserBoundStore((state) => state.username);

export const useUserDispatch = () =>
  UserBoundStore((state) => state.setUsername);

type UserSlice = {
  username: string;
  setUsername: (payload: string) => void;
};
