import type { NextApiRequest, NextApiResponse } from "next"

import connectMongo from "@/database/conn"
import {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
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
      getUsers(req, res)
      break
    case "POST":
      postUsers(req, res)
      break
    case "PUT":
      putUsers(req, res)
      break
    case "DELETE":
      deleteUsers(req, res)
      break
    default:
      // res.setHeader("Allowd", ["GET", "POST", "PUT", "DELETE"])
      res.status(405).end(`Method ${method} Not Allowd`)
  }
}
