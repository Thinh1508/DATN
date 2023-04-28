import type { NextApiRequest, NextApiResponse } from "next"

import connectMongo from "@/database/conn"
import {
  getCategory,
  postCategory,
  putCategory,
  deleteCategory,
} from "@/database/categoryController"

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
      getCategory(req, res)
      break
    case "POST":
      postCategory(req, res)
      break
    case "PUT":
      putCategory(req, res)
      break
    case "DELETE":
      deleteCategory(req, res)
      break
    default:
      // res.setHeader("Allowd", ["GET", "POST", "PUT", "DELETE"])
      res.status(405).end(`Method ${method} Not Allowd`)
  }
}
