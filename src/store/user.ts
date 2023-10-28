import { create } from "zustand";
import { devtools } from "zustand/middleware";

export enum UserActionTypes {
  SET_USER = "SET_USER",
}

const dispatchReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.SET_USER: {
      return { ...state, username: action.payload.username };
    }
    default: {
      throw new Error("Can not find action's type");
    }
  }
};

const userStore = create<UserState & UserDispatch>()(
  devtools(
    (set) => ({
      username: "",
      dispatch: (action) => set((state) => dispatchReducer(state, action)),
    }),
    { name: "user" }
  )
);

export const useUserState = () => userStore((state) => state.username);

export const useUserDispatch = () => userStore((state) => state.dispatch);

type UserState = {
  username: string;
};

type UserDispatch = {
  dispatch: (action: UserAction) => void;
};

type UserAction = {
  type: UserActionTypes;
  payload: {
    [Key in keyof UserState]: UserState[Key];
  };
};
