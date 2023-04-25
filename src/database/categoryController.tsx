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
