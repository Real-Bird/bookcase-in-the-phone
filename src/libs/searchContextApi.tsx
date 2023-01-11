import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

type FetchIsbnDataState = {
  PUBLISHER: string;
  UPDATE_DATE: string;
  AUTHOR: string;
  TITLE_URL: string;
  PRE_PRICE: string;
  FORM: string;
  PAGE: string;
  EA_ISBN: string;
  INPUT_DATE: string;
  SUBJECT: string;
  TITLE: string;
  PUBLISH_PREDATE: string;
  isLoading: boolean;
};

type FetchIsbnDataAction =
  | { type: "SET_DATA"; bookData: FetchIsbnDataState }
  | { type: "INITIALIZE_DATA" };

type FetchIsbnDataDispatch = Dispatch<FetchIsbnDataAction>;

const IsbnStateContext = createContext<FetchIsbnDataState>({
  PUBLISHER: "",
  UPDATE_DATE: "",
  AUTHOR: "",
  TITLE_URL: "",
  PRE_PRICE: "",
  FORM: "",
  PAGE: "",
  EA_ISBN: "",
  INPUT_DATE: "",
  SUBJECT: "",
  TITLE: "",
  PUBLISH_PREDATE: "",
  isLoading: true,
});

const IsbnActionContext = createContext<FetchIsbnDataDispatch>(() => null);

function reducer(
  state: FetchIsbnDataState,
  action: FetchIsbnDataAction
): FetchIsbnDataState {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        PUBLISHER: action.bookData.PUBLISHER,
        UPDATE_DATE: action.bookData.UPDATE_DATE,
        AUTHOR: action.bookData.AUTHOR,
        TITLE_URL: action.bookData.TITLE_URL,
        PRE_PRICE: action.bookData.PRE_PRICE,
        FORM: action.bookData.FORM,
        PAGE: action.bookData.PAGE,
        EA_ISBN: action.bookData.EA_ISBN,
        INPUT_DATE: action.bookData.INPUT_DATE,
        SUBJECT: action.bookData.SUBJECT,
        TITLE: action.bookData.TITLE,
        PUBLISH_PREDATE: action.bookData.PUBLISH_PREDATE,
        isLoading: false,
      };
    case "INITIALIZE_DATA":
      return {
        PUBLISHER: "",
        UPDATE_DATE: "",
        AUTHOR: "",
        TITLE_URL: "",
        PRE_PRICE: "",
        FORM: "",
        PAGE: "",
        EA_ISBN: "",
        INPUT_DATE: "",
        SUBJECT: "",
        TITLE: "",
        PUBLISH_PREDATE: "",
        isLoading: true,
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
  const [state, dispatch] = useReducer(reducer, {
    PUBLISHER: "",
    UPDATE_DATE: "",
    AUTHOR: "",
    TITLE_URL: "",
    PRE_PRICE: "",
    FORM: "",
    PAGE: "",
    EA_ISBN: "",
    INPUT_DATE: "",
    SUBJECT: "",
    TITLE: "",
    PUBLISH_PREDATE: "",
    isLoading: true,
  });
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

// const { Consumer: ModalConsumer } = ModalOpen;

// export { ModalProvider, ModalConsumer };

// export default ModalOpen;
