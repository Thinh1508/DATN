import { Schema, models, model } from "mongoose"

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, default: "/assets/images/avatar.jpg" },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: "Abc123@" },
    address: { type: String, required: true },
    dob: { type: String },
    gender: { type: Number },
    permissions: {
      type: String,
      required: true,
      default: "user",
    },
    status: { type: String, default: "active" },
  },
  {
    timestamps: true,
  }
)

const Users = models.user || model("user", userSchema)

export default Users
