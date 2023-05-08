import { Schema, models, model } from "mongoose"

const inspectionResultSchema = new Schema(
  {
    idUser: { type: String, required: true },
    idStore: { type: String },
    idDocument: { type: String },
    actionTine: { type: String, required: true },
    status: { type: String, default: "pending" },
  },
  {
    timestamps: true,
  }
)

const InspectionResult =
  models.inspectionResult || model("inspectionResult", inspectionResultSchema)

export default InspectionResult
