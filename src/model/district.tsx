import { Schema, models, model } from "mongoose"

const districtSchema = new Schema({
  name: { type: String, required: true },
})

const District = models.district || model("district", districtSchema)

export default District
