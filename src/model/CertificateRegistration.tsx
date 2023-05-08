import { Schema, models, model } from "mongoose"

const certificateRegistrationSchema = new Schema(
  {
    idStore: { type: String, required: true },
    proposal: { type: String, required: true },
    healthCertificate: { type: String, required: true },
    description: { type: String, required: true },
    trainCertificate: { type: String, required: true },
    status: { type: String, default: "pending" },
  },
  {
    timestamps: true,
  }
)

const CertificateRegistration =
  models.certificateRegistration ||
  model("certificateRegistration", certificateRegistrationSchema)

export default CertificateRegistration
