import type { NextApiRequest, NextApiResponse } from "next"

import connectMongo from "@/database/conn"
import {
  getCertificateReg,
  postCertificateReg,
  deleteCertificateReg,
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
      getCertificateReg(req, res)
      break
    case "POST":
      postCertificateReg(req, res)
      break
    // case "PUT":
    //   putUser(req, res)
    //   break
    case "DELETE":
      deleteCertificateReg(req, res)
      break
    default:
      // res.setHeader("Allowd", ["GET", "POST", "PUT", "DELETE"])
      res.status(405).end(`Method ${method} Not Allowd`)
  }
}
