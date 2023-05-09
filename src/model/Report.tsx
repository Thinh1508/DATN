import { Schema, models, model } from "mongoose"

const reportSchema = new Schema(
  {
    idUser: { type: Schema.Types.ObjectId, ref: "user", required: true },
    idStore: { type: Schema.Types.ObjectId, ref: "store", required: true },
    content: { type: String, require: true },
    imageReport: { type: String, require: true },
    status: { type: String, default: "pending" },
  },
  {
    timestamps: true,
  }
)

const Report = models.report || model("report", reportSchema)

export default Report
