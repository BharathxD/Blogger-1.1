import mongoose, { UpdateQuery } from "mongoose";
import postModel, { PostDocument } from "../models/post.model";
import { query } from "express";

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

export const getOnePost = async (
  postId: mongoose.FilterQuery<PostDocument>
) => {
  const post = await postModel
    .find({ _id: postId })
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

export const updatePost = async (
  query: mongoose.FilterQuery<PostDocument>,
  update: UpdateQuery<PostDocument>
) => {
  return await postModel.findByIdAndUpdate(query, update);
};

export const deletePost = async (query: mongoose.FilterQuery<PostDocument>) => {
  return await postModel.deleteOne(query).lean();
};
