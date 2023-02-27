import fs from "fs";
import path from "path";
import logger from "../utils/logger";

interface DeleteFileOptions {
  directoryPath: string;
  fileName: string;
}

export const deleteFile = ({ directoryPath, fileName }: DeleteFileOptions) => {
  const fullPath = path.join(__dirname, "..", directoryPath, fileName);

  fs.unlink(fullPath, (err) => {
    if (err) {
      logger.error("Error deleting file: ", err);
      return;
    }

    logger.info(`File "${fileName}" deleted successfully.`);
  });
};
