import { Schema, models, model } from "mongoose"

const certificateRegistrationSchema = new Schema(
  {
    idStore: { type: Schema.Types.ObjectId, ref: "store" },
    proposal: { type: String, required: true },
    healthCertificate: [],
    description: [],
    trainCertificate: { type: String, required: true },
    status: { type: String, default: "pending" },
    idPlan: { type: String },
  },
  {
    timestamps: true,
  }
)

const CertificateRegistration =
  models.certificateRegistration ||
  model("certificateRegistration", certificateRegistrationSchema)

export default CertificateRegistration
