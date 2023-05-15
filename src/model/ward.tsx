import { Schema, models, model } from "mongoose"

const wardSchema = new Schema({
  idDistrict: { type: Schema.Types.ObjectId, ref: "district" },
  name: { type: String, required: true },
})

const Ward = models.ward || model("ward", wardSchema)

export default Ward
