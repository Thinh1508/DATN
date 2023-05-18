import Report from "@/model/Report"
import Store from "@/model/Store"
import { NextApiRequest, NextApiResponse } from "next"

//get:http://localhost:3000/api/report
export async function getReport(req: NextApiRequest, res: NextApiResponse) {
  try {
    const report = await Report.find()
      .populate("idStore")
      .populate("idUser", "name")
    if (!report) return res.status(404).json({ error: "Data Not Found" })

    res.status(200).json(report)
  } catch (error) {
    res.status(500).json(error)
  }
}

//post:http://localhost:3000/api/report
export async function postReport(req: NextApiRequest, res: NextApiResponse) {
  try {
    const formData = req.body
    if (!formData)
      return res.status(400).json({ error: "Form Data Not Provided...!" })

    const report = await Report.create(formData)
    if (report) res.status(200).json({ data: report })
    else res.status(400).json({})
  } catch (error) {
    res.status(500).json(error)
  }
}

//put http://localhost:3000/api/report
export async function putReport(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { reportId } = req.query
    const formData = req.body

    if (reportId && formData) {
      await Report.findByIdAndUpdate(reportId, formData)
      return res.status(200).json(formData)
    }
    res.status(400).json({ error: "User Not Selected...!" })
  } catch (error) {
    res.status(400).json(error)
  }
}

//delete:http://localhost:3000/api/report
export async function deleteReport(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { reportId } = req.query
    console.log(reportId)
    if (reportId) {
      await Report.findByIdAndDelete(reportId)
      return res.status(200).json({ delete: reportId })
    }

    res.status(400).json({ error: "User Not Selected...!" })
  } catch (error) {
    res.status(400).json(error)
  }
}
