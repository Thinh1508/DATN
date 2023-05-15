import type { NextApiRequest, NextApiResponse } from "next"

import connectMongo from "@/database/conn"
import { getWard, postWard } from "@/database/userController"

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
      getWard(req, res)
      break
    case "POST":
      postWard(req, res)
      break
    default:
      res.status(405).end(`Method ${method} Not Allowd`)
  }
}
