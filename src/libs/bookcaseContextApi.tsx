import type { FetchIsbnDataState } from "@libs/searchContextApi";
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

export type BookcaseSubInfo = Pick<
  FetchIsbnDataState,
  | "title"
  | "author"
  | "translator"
  | "publisher"
  | "subject"
  | "title_url"
  | "ea_isbn"
>;

export type FetchBookcaseState = BookcaseSubInfo[];

type FetchBookcaseAction =
  | { type: "LOAD_DATA"; bookcase: FetchBookcaseState }
  | { type: "INITIALIZE_BOOKCASE_DATA" }
  | { type: "FILTER_DATA"; bookcase: FetchBookcaseState };

type FetchBookcaseDispatch = Dispatch<FetchBookcaseAction>;

const INITIALIZE_BOOKCASE_DATA: FetchBookcaseState = [];

const bookcaseStateContext = createContext<FetchBookcaseState>(
  INITIALIZE_BOOKCASE_DATA
);

const bookcaseActionContext = createContext<FetchBookcaseDispatch>(() => null);

function reducer(
  state: FetchBookcaseState,
  action: FetchBookcaseAction
): FetchBookcaseState {
  switch (action.type) {
    case "INITIALIZE_BOOKCASE_DATA":
      return INITIALIZE_BOOKCASE_DATA;
    case "LOAD_DATA":
      return [...action.bookcase];
    case "FILTER_DATA":
      return [...action.bookcase];
    default:
      throw new Error("Unhandled action");
  }
}

export const FetchBookcaseDataProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, INITIALIZE_BOOKCASE_DATA);
  return (
    <bookcaseStateContext.Provider value={state}>
      <bookcaseActionContext.Provider value={dispatch}>
        {children}
      </bookcaseActionContext.Provider>
    </bookcaseStateContext.Provider>
  );
};

export function useBookcaseState() {
  const state = useContext(bookcaseStateContext);
  if (!state) throw new Error("Cannot find bookcase");
  return state;
}

export function useBookcaseDispatch() {
  const dispatch = useContext(bookcaseActionContext);
  if (!dispatch) throw new Error("Cannot find bookcase");
  return dispatch;
}
