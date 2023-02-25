import { Request, Response } from "express";
import fs from "fs";
import { uploadPost } from "../services/post.service";
import { verifyJWT } from "../utils/jwt.utils";

export const postHandler = async (req: Request, res: Response) => {
  if (req.file && req.file.originalname) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    res.json({ extension: extension });
    const newPath = path + "." + extension;
    fs.renameSync(path, newPath);
    const { token } = req.cookies;
    const user = await verifyJWT(token);
    const author = (user.decoded as { _id: string })._id;
    const {
      title,
      summary,
      content,
    }: {
      title: string;
      summary: string;
      content: string;
    } = req.body;
    const post = await uploadPost({
      author: author,
      title: title,
      summary: summary,
      content: content,
      cover: newPath,
    });
  } else {
    res.send(409);
  }
};
