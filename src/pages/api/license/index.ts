import type { NextApiRequest, NextApiResponse } from "next"

import connectMongo from "@/database/conn"
import {
  deleteLicense,
  getLicense,
  postLicense,
  putLicense,
} from "@/database/licenseController"

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
      getLicense(req, res)
      break
    case "POST":
      postLicense(req, res)
      break
    case "PUT":
      putLicense(req, res)
      break
    case "DELETE":
      deleteLicense(req, res)
      break
    default:
      res.status(405).end(`Method ${method} Not Allowd`)
  }
}
