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
import { deleteFile } from "../middlewares/deleteFile.middleware";
import {
  CreatePostInput,
  DeletePostInput,
  EditPostInput,
  GetOnePostInput,
  GetPostsInput,
} from "../schema/post.schema";

export const postHandler = async (
  req: Request<{}, {}, CreatePostInput["body"]>,
  res: Response
) => {
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
    const authorProfile = (user.decoded as { profile: string }).profile;
    const { title, summary, content } = req.body;
    await uploadPost({
      author: authorID,
      authorProfile: authorProfile,
      title: title,
      summary: summary,
      content: content,
      cover: newPath,
    });
  } else {
    res.status(409);
  }
};

export const getPostsHandler = async (
  req: Request<GetPostsInput["params"]>,
  res: Response
) => {
  try {
    const posts = await getPosts();
    res.status(200).send(posts);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send({ message: error });
  }
};

export const getOnePostHandler = async (
  req: Request<GetOnePostInput["params"]>,
  res: Response
) => {
  try {
    const { postId } = req.params;
    const post = await getOnePost({ _id: postId });
    res.status(200).send(post);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send({ message: error });
  }
};

export const deletePostHandler = async (
  req: Request<DeletePostInput["params"]>,
  res: Response
) => {
  try {
    const { token } = req.cookies;
    //? If client doesn't provide the token, the user is not authenticated
    if (!token) {
      throw new Error("The user is not authenticated");
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
    deleteFile({
      directoryPath: "uploads",
      fileName: requestedPost.cover.replace("src/uploads/", ""),
    });
    const response = await deletePost({ _id: postId });
    res.status(200).send({ response });
  } catch (error: any) {
    res.status(409).send({ message: error.message });
  }
};

export const editPostHandler = async (
  req: Request<EditPostInput["params"]>,
  res: Response
) => {
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
    const userId = (user.decoded as { _id: string })._id;
    const requestedPost = await findPost({ author: userId });
    if (!requestedPost) {
      throw new Error("The user is not authenticated to do this operation");
    }
    deleteFile({
      directoryPath: "uploads",
      fileName: requestedPost.cover.replace("src/uploads/", ""),
    });
    const { postId } = req.params;
    const update = {
      title: req.body.title,
      summary: req.body.summary,
      content: req.body.content,
      cover: newPath,
    };
    const updatedPost = await updatePost({ _id: postId }, update);
    res.status(200).send(updatedPost);
  } catch (error: any) {
    res.status(409).send({ message: error.message });
  }
};
