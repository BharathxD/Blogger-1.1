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
  const post = await postModel
    .find()
    .populate("author", ["name"])
    .sort({ createdAt: -1 })
    .limit(20);
  return post;
};

export const findPost = async (query: mongoose.FilterQuery<PostDocument>) => {
  try {
    const post = await postModel.findOne(query).lean();
    return post;
  } catch (error: any) {
    throw new Error(error);
  }
};
