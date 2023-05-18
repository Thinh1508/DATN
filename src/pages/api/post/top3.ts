import type { NextApiRequest, NextApiResponse } from "next"

import connectMongo from "@/database/conn"
import { getPostTop3 } from "@/database/postController"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the Connection" })
  )

  const { method } = req

  switch (method) {
    case "GET":
      getPostTop3(req, res)
      break
    default:
      res.setHeader("Allowd", ["GET", "POST", "PUT", "DELETE"])
      res.status(405).end(`Method ${method} Not Allowd`)
  }
}
