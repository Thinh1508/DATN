import { Schema, models, model } from "mongoose"

const inspectionPlanSchema = new Schema(
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

const InspectionPlan =
  models.inspectionPlan || model("inspectionPlan", inspectionPlanSchema)

export default InspectionPlan
