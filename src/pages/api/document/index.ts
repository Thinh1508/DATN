import type { NextApiRequest, NextApiResponse } from "next"

import connectMongo from "@/database/conn"
import {
  deleteDocument,
  getDocument,
  postDocument,
  putDocument,
} from "@/database/documentController"

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
      getDocument(req, res)
      break
    case "POST":
      postDocument(req, res)
      break
    case "PUT":
      putDocument(req, res)
      break
    case "DELETE":
      deleteDocument(req, res)
      break
    default:
      res.status(405).end(`Method ${method} Not Allowd`)
  }
}
