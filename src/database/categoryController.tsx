import Category from "@/model/Category"
import { NextApiRequest, NextApiResponse } from "next"

//get:http://localhost:3000/api/categorys
export async function getCategory(req: NextApiRequest, res: NextApiResponse) {
  try {
    const category = await Category.find()
    if (!category) return res.status(404).json({ error: "Data Not Found" })

    res.status(200).json(category)
  } catch (error) {
    res.status(500).json(error)
  }
}

//get:http://localhost:3000/api/category/1
export async function getCategoryId(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { Id } = req.query
    if (Id) {
      const user = await Category.findById(Id)
      res.status(200).json(user)
    }
    res.status(400).json({ error: "Category Not Selected...!" })
  } catch (error) {
    res.status(500).json(error)
  }
}

//post:http://localhost:3000/api/categorys
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

//put:http://localhost:3000/api/categorys/1
export async function putCategory(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { Id } = req.query
    const formData = req.body
    console.log(Id, formData)
    if (Id && formData) {
      await Category.findByIdAndUpdate(Id, formData)
      return res.status(200).json(formData)
    }
    res.status(400).json({ error: "Category Not Selected...!" })
  } catch (error) {
    res.status(400).json(error)
  }
}

//delete:http://localhost:3000/api/category/1
export async function deleteCategory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { Id } = req.query
    if (Id) {
      await Category.findByIdAndDelete(Id)
      return res.status(200).json({ delete: Id })
    }

    res.status(400).json({ error: "Category Not Selected...!" })
  } catch (error) {
    res.status(400).json(error)
  }
}
