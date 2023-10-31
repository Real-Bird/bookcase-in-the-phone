import BoundStore from "@store/index";

export const useUserState = () => BoundStore((state) => state.username);

export const useUserDispatch = () => BoundStore((state) => state.setUsername);

export const useBookcaseState = () => BoundStore((state) => state.bookcase);
export const useBookcaseDispatch = () =>
  BoundStore((state) => ({ setBookcase: state.setBookcase }));

export const useBookInfoState = () => BoundStore((state) => state.bookInfo);

export const useBookInfoDispatch = () =>
  BoundStore((state) => ({
    setBookInfo: state.setBookInfo,
    getBookInfo: state.getBookInfo,
    initBookInfo: state.initialize,
  }));
