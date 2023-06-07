import type { NextApiRequest, NextApiResponse } from "next"

import connectMongo from "@/database/conn"
import { postDocumentView } from "@/database/documentController"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the Connection" })
  )

  const { method } = req

  switch (method) {
    case "POST":
      postDocumentView(req, res)
      break
    default:
      res.status(405).end(`Method ${method} Not Allowd`)
  }
}
