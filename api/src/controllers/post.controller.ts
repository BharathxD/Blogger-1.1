import { Request, Response } from "express";
import fs from "fs";
import {
  deletePost,
  findPost,
  getOnePost,
  getPosts,
  updatePost,
  uploadPost,
} from "../services/post.service";
import { verifyJWT } from "../utils/jwt.utils";
import logger from "../utils/logger";

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

export const getOnePostHandler = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const posts = await getOnePost({ _id: postId });
    res.status(200).send(posts);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send({ message: error });
  }
};

export const deletePostHandler = async (req: Request, res: Response) => {
  try {
    const { token } = req.cookies;
    //? If client doesn't provide the token, the user is not authenticated
    if (!token) {
      throw new Error("The user is not authenticated");
    }
    const user = verifyJWT(token);
    //? If verifyJWT doesn't return the token validity, the provided token is not valid
    if (!user) {
      throw new Error("Found no users");
    }
    const { postId } = req.params;
    const post = await findPost({ _id: postId });
    //? If findPost doesn't return any post, it throws new error that the post does;t exist
    if (!post) {
      throw new Error("The post doesn't exist");
    }
    const postAuthorId = post.author;
    const requestedPost = await findPost({ author: postAuthorId });
    if (!requestedPost) {
      throw new Error("The user is not authenticated to do this operation");
    }
    const response = await deletePost({ _id: postId });
    res.status(200).send({ response });
  } catch (error: any) {
    res.status(409).send({ message: error.message });
  }
};

export const findPostHandler = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const post = await findPost({ _id: postId });
    res.status(200).send(post);
  } catch (error: any) {
    res.status(409).send({ message: error });
  }
};

export const editPostHandler = async (req: Request, res: Response) => {
  try {
    let newPath = null;
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      newPath = path + "." + ext;
      fs.renameSync(path, newPath);
    }
    const { token } = req.cookies;
    //? If client doesn't provide the token, the user is not authenticated
    if (!token) {
      throw new Error("The user is not authenticated");
    }
    const user = verifyJWT(token);
    if (!user) {
      throw new Error("The request is invalid");
    }
    const userId = (user.decoded as { _id: string })._id;
    const requestedPost = await findPost({ author: userId });
    if (!requestedPost) {
      throw new Error("The user is not authenticated to do this operation");
    }
    const { postId } = req.params;
    const update = req.body;
    const updatedPost = await updatePost({ _id: postId }, update);
    res.status(200).send(updatedPost);
  } catch (error: any) {
    res.status(409).send({ message: error.message });
  }
};
