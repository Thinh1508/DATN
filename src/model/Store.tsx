import { Schema, models, model } from "mongoose"

const storeSchema = new Schema(
  {
    idUser: { type: String, required: true },
    name: { type: String, required: true },
    imageBusiness: { type: String, required: true },
    type: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, default: "active" },
  },
  {
    timestamps: true,
  }
)

const Store = models.store || model("store", storeSchema)

export default Store
