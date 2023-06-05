import { Schema, models, model } from "mongoose"
import { type } from "os"

const documentSchema = new Schema(
  {
    symbol: { type: String, require: true },
    category: { type: String, require: true },
    issuingAgency: { type: String, require: true },
    title: { type: String, require: true },
    content: { type: String },
    note: { type: String, require: true },
    idUser: { type: Schema.Types.ObjectId, ref: "user", required: true },
    issued: { type: String, require: true },
    effective: { type: String, require: true },
    status: { type: String, default: "active" },
  },
  {
    timestamps: true,
  }
)

const Document = models.document || model("document", documentSchema)

export default Document
