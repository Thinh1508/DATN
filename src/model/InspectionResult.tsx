import { Schema, models, model } from "mongoose"

const inspectionResultSchema = new Schema(
  {
    idUser: { type: Schema.Types.ObjectId, ref: "user", required: true },
    idInspectionPlan: { type: Schema.Types.ObjectId, ref: "inspectionPlan" },
    idDocument: { type: String },
    content: { type: String, required: true },
    note: { type: String },
    img: [],
  },
  {
    timestamps: true,
  }
)

const InspectionResult =
  models.inspectionResult || model("inspectionResult", inspectionResultSchema)

export default InspectionResult
