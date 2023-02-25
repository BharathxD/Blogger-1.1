import express from "express";
import config from "config";
import connect from "./utils/connect";
import cors from "cors";
import logger from "./utils/logger";
import route from "./routes";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const PORT = config.get<number>("PORT");
const app = express();

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());

app.listen(PORT, async () => {
  logger.info(`The server is running on http://localhost:${PORT}`);
  await connect();
  route(app);
});
