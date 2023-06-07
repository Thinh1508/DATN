import { Schema, models, model } from "mongoose"

const licenseSchema = new Schema(
  {
    idStore: { type: Schema.Types.ObjectId, ref: "store", required: true },
    dateRange: { type: String, require: true },
    period: { type: Number, default: 3 },
    status: { type: String, default: "active" },
  },
  {
    timestamps: true,
  }
)

const License = models.license || model("license", licenseSchema)

export default License
