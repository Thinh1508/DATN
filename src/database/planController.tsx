import InspectionPlan from "@/model/InspectionPlan"
import { NextApiRequest, NextApiResponse } from "next"

//get:http://localhost:3000/api/inspectionPlan
export async function getInspectionPlan(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const plan = await InspectionPlan.find()
      .populate("idStore")
      .populate("idReport")
    if (!plan) return res.status(404).json({ error: "Data Not Found" })

    res.status(200).json(plan)
  } catch (error) {
    res.status(500).json(error)
  }
}

//post:http://localhost:3000/api/inspectionPlan
export async function postInspectionPlan(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const formData = req.body
    console.log(formData)
    if (!formData)
      return res.status(400).json({ error: "Form Data Not Provided...!" })

    const plan = await InspectionPlan.create(formData)
    if (plan) res.status(200).json({ data: plan })
    else res.status(400).json({})
  } catch (error) {
    res.status(500).json(error)
  }
}
//put:http://localhost:3000/api/inspectionPlan
export async function putInspectionPlan(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { planId } = req.query
    const formData = req.body

    if (planId && formData) {
      await InspectionPlan.findByIdAndUpdate(planId, formData)
      return res.status(200).json(formData)
    }
    res.status(401).json({ error: "User Not Selected...!" })
  } catch (error) {
    res.status(400).json(error)
  }
}
