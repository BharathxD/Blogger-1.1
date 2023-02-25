import { Request, Response } from "express";
import fs from "fs";

export const postHandler = (req: Request, res: Response) => {
  if (req.file && req.file.originalname) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    res.json({ extension: extension });
    const newPath = path + "." + extension;
    fs.renameSync(path, newPath);
  }
  res.status(200).json({ file: req.files });
};
