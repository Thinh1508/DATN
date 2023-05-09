import type { NextApiRequest, NextApiResponse } from "next"

import connectMongo from "@/database/conn"
import {
  getInspectionPlan,
  postInspectionPlan,
} from "@/database/planController"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the Connection" })
  )

  //Type of request
  const { method } = req

  switch (method) {
    case "GET":
      getInspectionPlan(req, res)
      break
    case "POST":
      postInspectionPlan(req, res)
      break
    default:
      res.status(405).end(`Method ${method} Not Allowd`)
  }
}
