import { Schema, models, model } from "mongoose"

const addressSchema = new Schema({
  district: {
    type: String,
    required: true,
  },
  ward: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
})

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, default: "/assets/images/avatar.jpg" },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: "Abc123@" },
    address: {
      district: {
        type: String,
        required: true,
      },
      ward: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
    },
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
