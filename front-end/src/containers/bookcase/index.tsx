import {
  UserInfoState,
  useUserDispatch,
  useUserState,
} from "@/libs/userContextApi";
import { BookList, BookListItem } from "@components/bookcase";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";

function BookcaseContainer() {
  const bookList = [...Array.from(Array(20).keys())];
  // const [loading, setLoading] = useState(false)
  const userDispatch = useUserDispatch();
  const navigate = useNavigate();
  useEffect(() => {}, []);
  return (
    <BookList>
      {bookList?.map((book, idx) => (
        <BookListItem key={idx} idx={idx} />
      ))}
    </BookList>
  );
}

export default BookcaseContainer;
