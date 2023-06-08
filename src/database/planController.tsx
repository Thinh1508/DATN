import InspectionPlan from "@/model/InspectionPlan"
import InspectionResult from "@/model/InspectionResult"
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

//get:http://localhost:3000/api/inspectionPlan/id
export async function getInspectionPlanId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query
    if (id) {
      const plan = await InspectionPlan.findById(id)
        .populate("idStore")
        .populate("idReport")
      res.status(200).json(plan)
    }
    res.status(400).json({ error: "User Not Selected...!" })
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

//delete:http://localhost:3000/api/inspectionPlan
export async function deleteInspectionPlan(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { planId } = req.query
    if (planId) {
      await InspectionPlan.findByIdAndDelete(planId)
      return res.status(200).json({ delete: planId })
    }

    res.status(400).json({ error: "User Not Selected...!" })
  } catch (error) {
    res.status(400).json(error)
  }
}

//get:http://localhost:3000/api/inspectionResult
export async function getInspectionResult(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const plan = await InspectionResult.find().populate("idInspectionPlan")
    if (!plan) return res.status(404).json({ error: "Data Not Found" })

    res.status(200).json(plan)
  } catch (error) {
    res.status(500).json(error)
  }
}
//get:http://localhost:3000/api/inspectionResult/id
export async function getInspectionResultId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query
    if (id) {
      const plan = await InspectionResult.findOne({
        idInspectionPlan: id,
      })
        .populate("idDocument", "title")
        .populate("idInspectionPlan")
      res.status(200).json(plan)
    }
    res.status(400).json({ error: "User Not Selected...!" })
  } catch (error) {
    res.status(500).json(error)
  }
}

//post:http://localhost:3000/api/inspectionResult
export async function postInspectionResult(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const formData = req.body
    if (!formData)
      return res.status(400).json({ error: "Form Data Not Provided...!" })

    const plan = await InspectionResult.create(formData)
    if (plan) res.status(200).json({ data: plan })
    else res.status(400).json({})
  } catch (error) {
    res.status(500).json(error)
  }
}
//put:http://localhost:3000/api/inspectionResult
export async function putInspectionResult(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { resultId } = req.query
    const formData = req.body

    if (resultId && formData) {
      await InspectionResult.findByIdAndUpdate(resultId, formData)
      return res.status(200).json(formData)
    }
    res.status(401).json({ error: "User Not Selected...!" })
  } catch (error) {
    res.status(400).json(error)
  }
}

//delete:http://localhost:3000/api/inspectionResult
export async function deleteInspectionResult(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { resultId } = req.query
    if (resultId) {
      await InspectionResult.findByIdAndDelete(resultId)
      return res.status(200).json({ delete: resultId })
    }

    res.status(400).json({ error: "User Not Selected...!" })
  } catch (error) {
    res.status(400).json(error)
  }
}
