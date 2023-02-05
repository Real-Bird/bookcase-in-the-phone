import { setSubject } from "@libs/utils";
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

export type FetchIsbnDataState = {
  title: string;
  author: string;
  translator?: string;
  publisher: string;
  publisher_predate: string;
  ea_isbn: string;
  title_url: string;
  subject: string;
  review?: string;
  start_date?: string;
  end_date?: string;
  hasData?: boolean;
};

type FetchIsbnDataAction =
  | { type: "LOAD_DATA"; bookInfo: FetchIsbnDataState }
  | { type: "INITIALIZE_DATA" }
  | { type: "SET_DATA"; bookInfo: FetchIsbnDataState };

type FetchIsbnDataDispatch = Dispatch<FetchIsbnDataAction>;

const INITIALIZE_ISBN_DATA: FetchIsbnDataState = {
  author: "",
  ea_isbn: "",
  end_date: "",
  publisher: "",
  publisher_predate: "",
  review: "",
  start_date: "",
  subject: "",
  title: "",
  title_url: "",
  translator: "",
  hasData: false,
};

const IsbnStateContext =
  createContext<FetchIsbnDataState>(INITIALIZE_ISBN_DATA);

const IsbnActionContext = createContext<FetchIsbnDataDispatch>(() => null);

function reducer(
  state: FetchIsbnDataState,
  action: FetchIsbnDataAction
): FetchIsbnDataState {
  switch (action.type) {
    case "INITIALIZE_DATA":
      return INITIALIZE_ISBN_DATA;
    case "LOAD_DATA":
      const authorReg = / ?(지은이|지음) ?[:]? ?/g;
      const translatorReg = /[ ]?(옮김)[: ]*|(옮긴이)[: ]+/g;
      const replaceWriter = action.bookInfo.author.replace(authorReg, "");
      const [author, rest] = replaceWriter.split(";");
      const translator =
        rest && rest.includes("옮") ? rest.replace(translatorReg, "") : "-";
      const replaceDate = action.bookInfo.publisher_predate.replace(
        /(\d{4})(\d{2})(\d{2})/g,
        "$1-$2-$3"
      );
      const subject = setSubject(action.bookInfo.subject);
      return {
        ...state,
        publisher: action.bookInfo.publisher,
        author: author,
        translator: translator ? translator : "",
        title_url: action.bookInfo.title_url,
        ea_isbn: action.bookInfo.ea_isbn,
        subject,
        title: action.bookInfo.title,
        publisher_predate: replaceDate,
        hasData: true,
      };
    case "SET_DATA":
      return {
        ...state,
        ...action.bookInfo,
        hasData: true,
      };
    default:
      throw new Error("Unhandled action");
  }
}

export const FetchIsbnDataProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, INITIALIZE_ISBN_DATA);
  return (
    <IsbnStateContext.Provider value={state}>
      <IsbnActionContext.Provider value={dispatch}>
        {children}
      </IsbnActionContext.Provider>
    </IsbnStateContext.Provider>
  );
};

export function useIsbnState() {
  const state = useContext(IsbnStateContext);
  if (!state) throw new Error("Cannot find Isbn");
  return state;
}

export function useIsbnDispatch() {
  const dispatch = useContext(IsbnActionContext);
  if (!dispatch) throw new Error("Cannot find Isbn");
  return dispatch;
}
