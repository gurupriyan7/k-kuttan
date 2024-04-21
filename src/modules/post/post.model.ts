import { Schema, model } from "mongoose";

const PostSchema = new Schema({});

const Post = model("posts", PostSchema);

export default Post;
