import mongoose from "mongoose"

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String },
    description: { type: String },
    type: { type: String },
  },
  { timestamps: true }
)

const Category =
  mongoose.models.category || mongoose.model("category", categorySchema)

export default Category
