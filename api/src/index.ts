import express from "express";
import config from "config";
import connect from "./utils/connect";
import cors from "cors";
import logger from "./utils/logger";
import path from "path";
import route from "./routes";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const PORT = config.get<number>("PORT");
const app = express();

// It can be a route to serve the uploaded files
// Serving all the static files from Uploads Directory
app.use("/uploads", express.static(path.join(__dirname, "uploads/")));
// It is used to parse the JSON that are sent by the client
app.use(express.json());
// Middleware to parse urlencoded requested like localhost:3000/name?name
app.use(express.urlencoded({ extended: false }));
// Setting the origin where the API Activity can be requested
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
// Parse the cookies that are sent by client
app.use(cookieParser());

app.listen(PORT, async () => {
  logger.info(`The server is running on http://localhost:${PORT}`);
  await connect();
  route(app);
});
