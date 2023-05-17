import { Schema, models, model } from "mongoose"

const inspectionPlanSchema = new Schema(
  {
    idUser: { type: Schema.Types.ObjectId, ref: "user", required: true },
    idStore: { type: Schema.Types.ObjectId, ref: "store" },
    idReport: { type: Schema.Types.ObjectId, ref: "report" },
    idDocument: { type: String },
    name: { type: String, require: true },
    category: { type: String, require: true },
    startTime: { type: String, required: true },
    actionTime: { type: String, required: true },
    status: { type: String, default: "pending" },
  },
  {
    timestamps: true,
  }
)

const InspectionPlan =
  models.inspectionPlan || model("inspectionPlan", inspectionPlanSchema)

export default InspectionPlan
