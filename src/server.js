import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const app = express();
const logger = morgan("dev");
console.log("훈아 오늘도 화이팅");

app.set("view engine", "pug");
app.set("views", "./src/views");
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
