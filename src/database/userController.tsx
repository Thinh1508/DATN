// user controller

import Users from "@/model/user"
import { NextApiRequest, NextApiResponse } from "next"

//get:http://localhost:3000/api/users
export async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await Users.find()
    if (!users) return res.status(404).json({ error: "Data Not Found" })

    res.status(200).json(users)
  } catch (error) {
    res.status(500).json(error)
  }
}

//get:http://localhost:3000/api/users/1
export async function getUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query
    if (userId) {
      const user = await Users.findById(userId)
      res.status(200).json(user)
    }
    res.status(400).json({ error: "User Not Selected...!" })
  } catch (error) {
    res.status(500).json(error)
  }
}

//post:http://localhost:3000/api/users
export async function postUsers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const formData = req.body
    if (!formData)
      return res.status(400).json({ error: "Form Data Not Provided...!" })

    const user = await Users.create(formData)
    if (user) res.status(200).json({ data: user })
    else res.status(400).json({})
  } catch (error) {
    res.status(500).json(error)
  }
}

//put:http://localhost:3000/api/users/1
export async function putUsers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query
    const formData = req.body

    if (userId && formData) {
      await Users.findByIdAndUpdate(userId, formData)
      return res.status(200).json(formData)
    }
    res.status(400).json({ error: "User Not Selected...!" })
  } catch (error) {
    res.status(400).json(error)
  }
}

//delete:http://localhost:3000/api/users/1
export async function deleteUsers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query
    console.log(userId)
    if (userId) {
      await Users.findByIdAndDelete(userId)
      return res.status(200).json({ delete: userId })
    }

    res.status(400).json({ error: "User Not Selected...!" })
  } catch (error) {
    res.status(400).json(error)
  }
}
