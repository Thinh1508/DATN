import type { NextApiRequest, NextApiResponse } from "next"

import connectMongo from "@/database/conn"
import {
  getInspectionResult,
  postInspectionResult,
  putInspectionResult,
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
      getInspectionResult(req, res)
      break
    case "POST":
      postInspectionResult(req, res)
      break
    case "PUT":
      putInspectionResult(req, res)
      break
    default:
      res.status(405).end(`Method ${method} Not Allowd`)
  }
}
