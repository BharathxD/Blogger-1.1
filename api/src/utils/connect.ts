import config from "config";
import logger from "./logger";
import mongoose from "mongoose";

const connect = async () => {
  const dbUri = config.get<string>("dbUri");
  mongoose.set("strictQuery", false);
  try {
    logger.info("Connecting to the Database...");
    await mongoose.connect(dbUri);
    logger.info("Database Connected ✅");
  } catch (error) {
    logger.error("Could not connect to Database ❌");
    logger.error(error);
    process.exit(1);
  }
};

export default connect;
