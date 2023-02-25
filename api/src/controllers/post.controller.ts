import { Request, Response } from "express";
import fs from "fs";
import { getPosts, uploadPost } from "../services/post.service";
import { verifyJWT } from "../utils/jwt.utils";
import logger from "../utils/logger";
import { findUser } from "../services/user.service";

export const postHandler = async (req: Request, res: Response) => {
  if (req.file && req.file.originalname) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    res.json({ extension: extension });
    const newPath = path + "." + extension;
    fs.renameSync(path, newPath);
    const { token } = req.cookies;
    const user = verifyJWT(token);
    const authorID = (user.decoded as { _id: number })._id;
    const { title, summary, content } = req.body;
    await uploadPost({
      author: authorID,
      title: title,
      summary: summary,
      content: content,
      cover: newPath,
    });
  } else {
    res.send(409);
  }
};

export const getPostsHandler = async (req: Request, res: Response) => {
  try {
    const posts = await getPosts();
    res.status(200).send(posts);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send({ message: error });
  }
};
