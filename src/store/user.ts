import { SlicePattern } from "zustand";

enum UserActions {
  SET_USERNAME = "user/SetUsername",
}

const createUserSlice: SlicePattern<UserSlice> = (set) => ({
  username: "",
  setUsername: (payload) =>
    set(
      (state) => {
        state.username = payload;
      },
      false,
      UserActions.SET_USERNAME
    ),
});

export type UserSlice = {
  username: string;
  setUsername: (payload: string) => void;
};

export default createUserSlice;
