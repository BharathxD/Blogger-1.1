import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface PostDocument extends mongoose.Document {
  author: UserDocument["_id"];
  authorProfile: string;
  title: string;
  summary: string;
  content: string;
  cover: string;
  createdAt: Date;
  updatedAt: Date;
}

const POST = {
  title: {
    type: String,
    require: true,
  },
  authorProfile: {
    type: String,
    require: true,
  },
  summary: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  cover: {
    type: String,
    require: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
};

const postSchema = new mongoose.Schema<PostDocument>(POST, {
  timestamps: true,
});

const postModel = mongoose.model("Post", postSchema);

export default postModel;
