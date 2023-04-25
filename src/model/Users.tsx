import { Schema, models, model } from "mongoose"

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: "Abc123@" },
    address: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: Number },
    permissions: {
      type: String,
      required: true,
      password: { type: String, required: true },
    },
    status: { type: String, default: "active" },
  },
  {
    timestamps: true,
  }
)

const Users = models.user || model("user", userSchema)

export default Users
