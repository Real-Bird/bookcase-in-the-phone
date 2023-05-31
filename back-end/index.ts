import dotenv from "dotenv";
import app from "./app";
import connect from "./src/db/index";

dotenv.config();
const port = process.env.PORT || 8001;

connect();

app.listen(port, () => {
  console.log(port, "번 포트에서 대기 중");
});
