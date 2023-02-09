import { Layout } from "@components/common";
import { Initialization } from "@components/common/Initialization";
import BookcaseContainer from "@containers/bookcase";
import { useState } from "react";

export function Bookcase() {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 4000);
  return (
    <Layout title={loading ? "LOADING..." : "BOOKCASE"}>
      {loading ? <Initialization /> : <BookcaseContainer />}
    </Layout>
  );
}
