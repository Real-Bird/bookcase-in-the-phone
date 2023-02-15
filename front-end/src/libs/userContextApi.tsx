import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

export type UserInfoState = {
  id: string;
  name: string;
  email: string;
  registeredAt: string;
};

type FetchUserDataState = {
  userInfo: UserInfoState;
  isLoading: boolean;
  isLoggedIn: boolean;
};

type FetchUserDataAction =
  | { type: "SET_USER"; userInfo: UserInfoState }
  | { type: "INITIALIZE_USER" }
  | { type: "CHECK_USER"; isLoggedIn: boolean }
  | { type: "TEMP_SET_USER"; userInfo: UserInfoState; isLoggedIn: boolean };

type FetchUserDataDispatch = Dispatch<FetchUserDataAction>;

const INITIALIZE_USER_DATA: FetchUserDataState = {
  userInfo: { email: "", id: "", name: "", registeredAt: "" },
  isLoading: true,
  isLoggedIn: false,
};

const UserStateContext =
  createContext<FetchUserDataState>(INITIALIZE_USER_DATA);

const UserActionContext = createContext<FetchUserDataDispatch>(() => null);

function reducer(
  state: FetchUserDataState,
  action: FetchUserDataAction
): FetchUserDataState {
  switch (action.type) {
    case "INITIALIZE_USER":
      return INITIALIZE_USER_DATA;
    case "TEMP_SET_USER":
      return {
        ...state,
        userInfo: action.userInfo,
        isLoggedIn: action.isLoggedIn,
        isLoading: false,
      };
    case "SET_USER":
      const { id, email, name, registeredAt } = action.userInfo;
      return {
        ...state,
        userInfo: {
          email,
          id,
          name,
          registeredAt,
        },
        isLoading: false,
        isLoggedIn: true,
      };
    case "CHECK_USER":
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    default:
      throw new Error("Unhandled action");
  }
}

const FetchUserDataProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, INITIALIZE_USER_DATA);
  return (
    <UserStateContext.Provider value={state}>
      <UserActionContext.Provider value={dispatch}>
        {children}
      </UserActionContext.Provider>
    </UserStateContext.Provider>
  );
};

export function useUserState() {
  const state = useContext(UserStateContext);
  if (!state) throw new Error("Cannot find User");
  return state;
}

export function useUserDispatch() {
  const dispatch = useContext(UserActionContext);
  if (!dispatch) throw new Error("Cannot find User");
  return dispatch;
}

export default FetchUserDataProvider;
