import { Schema, models, model } from "mongoose"

const storeSchema = new Schema(
  {
    idUser: { type: String, required: true },
    name: { type: String, required: true },
    imageBusiness: { type: String, required: true },
    avatar: { type: String, default: "/assets/images/avatarStore.jpg" },
    type: { type: String, required: true },
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
    status: { type: String, default: "active" },
  },
  {
    timestamps: true,
  }
)

const Store = models.store || model("store", storeSchema)

export default Store
