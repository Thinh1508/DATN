import type { NextApiRequest, NextApiResponse } from "next"

import connectMongo from "@/database/conn"
import {
  getStore,
  postStore,
  putStore,
  deleteStore,
} from "@/database/storeController"

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
      getStore(req, res)
      break
    case "POST":
      postStore(req, res)
      break
    case "PUT":
      putStore(req, res)
      break
    case "DELETE":
      deleteStore(req, res)
      break
    default:
      // res.setHeader("Allowd", ["GET", "POST", "PUT", "DELETE"])
      res.status(405).end(`Method ${method} Not Allowd`)
  }
}
