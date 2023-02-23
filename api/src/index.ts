import express from "express";
import config from "config";
import connect from "./utils/connect";
import cors from "cors";
import logger from "./utils/logger";
import route from "./routes";

const PORT = config.get<number>("PORT");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use((req, res, next) => {
  console.log("BODY: ", req.body);
  next();
});

app.listen(PORT, async () => {
  logger.info(`The server is running on http://localhost:${PORT}`);
  await connect();
  route(app);
});
