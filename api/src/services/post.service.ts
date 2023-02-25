import mongoose from "mongoose";
import postModel, { PostDocument } from "../models/post.model";

export const uploadPost = async (
  input: mongoose.DocumentDefinition<
    Omit<PostDocument, "createdAt" | "updatedAt">
  >
) => {
  try {
    const post = await postModel.create(input);
    return post;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getPosts = async () => {
  return postModel
    .find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
};
