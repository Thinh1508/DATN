import Category from "@/model/Category"
import { NextApiRequest, NextApiResponse } from "next"

//get:http://localhost:3000/api/category
export async function getCategory(req: NextApiRequest, res: NextApiResponse) {
  try {
    const category = await Category.find().sort({ createdAt: -1 })
    if (!category) return res.status(404).json({ error: "Data Not Found" })

    res.status(200).json(category)
  } catch (error) {
    res.status(500).json(error)
  }
}

//get:http://localhost:3000/api/category/1
export async function getCategoryId(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { categoryId } = req.query
    if (categoryId) {
      const category = await Category.findById(categoryId)
      res.status(200).json(category)
    }
    res.status(400).json({ error: "Category Not Selected...!" })
  } catch (error) {
    res.status(500).json(error)
  }
}

//post:http://localhost:3000/api/category
export async function postCategory(req: NextApiRequest, res: NextApiResponse) {
  try {
    const formData = req.body
    if (!formData)
      return res.status(400).json({ error: "Form Data Not Provided...!" })

    const category = await Category.create(formData)
    if (category) res.status(200).json({ data: category })
    else res.status(400).json({})
  } catch (error) {
    res.status(500).json(error)
  }
}

//put:http://localhost:3000/api/category/1
export async function putCategory(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { categoryId } = req.query
    const formData = req.body
    if (categoryId && formData) {
      await Category.findByIdAndUpdate(categoryId, formData)
      return res.status(200).json(formData)
    }
    res.status(400).json({ error: "Category Not Selected...!" })
  } catch (error) {
    res.status(400).json(error)
  }
}

//delete:http://localhost:3000/api/category/1yyy
export async function deleteCategory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { categoryId } = req.query
    if (categoryId) {
      await Category.findByIdAndDelete(categoryId)
      return res.status(200).json({ delete: categoryId })
    }

    res.status(400).json({ error: "Category Not Selected...!" })
  } catch (error) {
    res.status(400).json(error)
  }
}
