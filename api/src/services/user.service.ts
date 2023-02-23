import mongoose from "mongoose";
import User, { UserDocument } from "../models/user.model";
import { omit } from "lodash";

export const registerUser = async (
  input: mongoose.DocumentDefinition<
    Omit<UserDocument, "createdAt" | "comparePassword" | "updatedAt">
  >
) => {
  try {
    const user = await User.create(input);
    return omit(user.toJSON, "password");
  } catch (error: any) {
    throw new Error(error);
  }
};

export const validatePassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await User.findOne({ email });
  if (!user) {
    return false;
  }
  const isValid = await user.comparePassword(password);
  if (!isValid) {
    return false;
  }
  return omit(user.toJSON, "password");
};

export const findUser = async (query: mongoose.FilterQuery<UserDocument>) => {
  try {
    const user = await User.findOne(query).lean();
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
};
