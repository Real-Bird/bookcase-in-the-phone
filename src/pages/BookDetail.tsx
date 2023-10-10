import { Layout } from "@components/common";
import BookDetailContainer from "@containers/bookDetail";

export default function BookDetail() {
  return (
    <Layout title="BOOK INFO" back="..">
      <BookDetailContainer />
    </Layout>
  );
}
