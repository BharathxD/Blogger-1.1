import fs from "fs";
import path from "path";

interface DeleteFileOptions {
  directoryPath: string;
  fileName: string;
}

export const deleteFile = ({ directoryPath, fileName }: DeleteFileOptions) => {
  const fullPath = path.join(__dirname, "..", directoryPath, fileName);

  fs.unlink(fullPath, (err) => {
    if (err) {
      console.error("Error deleting file: ", err);
      return;
    }

    console.log(`File "${fileName}" deleted successfully.`);
  });
};
