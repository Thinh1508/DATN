import { Schema, models, model } from "mongoose"

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    description: { type: String },
    idUser: { type: Schema.Types.ObjectId, ref: "user" },
    background: { type: String, required: true },
    status: { type: String, default: "active" },
  },
  {
    timestamps: true,
  }
)

const Post = models.post || model("post", postSchema)

export default Post
