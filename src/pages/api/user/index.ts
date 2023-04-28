import type { NextApiRequest, NextApiResponse } from "next"

import connectMongo from "@/database/conn"
import {
  getUser,
  postUser,
  putUser,
  deleteUser,
} from "@/database/userController"

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
      getUser(req, res)
      break
    case "POST":
      postUser(req, res)
      break
    case "PUT":
      putUser(req, res)
      break
    case "DELETE":
      deleteUser(req, res)
      break
    default:
      // res.setHeader("Allowd", ["GET", "POST", "PUT", "DELETE"])
      res.status(405).end(`Method ${method} Not Allowd`)
  }
}
