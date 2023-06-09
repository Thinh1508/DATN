// user controller

import { NextApiRequest, NextApiResponse } from "next"
import Users from "@/model/Users"
import District from "@/model/district"
import Ward from "@/model/ward"

//get:http://localhost:3000/api/users
export async function getUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await Users.find()
    if (!users) return res.status(404).json({ error: "Data Not Found" })

    res.status(200).json(users)
  } catch (error) {
    res.status(500).json(error)
  }
}

//get:http://localhost:3000/api/users/1
export async function getUserId(req: NextApiRequest, res: NextApiResponse) {
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
export async function postUser(req: NextApiRequest, res: NextApiResponse) {
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
export async function putUser(req: NextApiRequest, res: NextApiResponse) {
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
export async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query
    if (userId) {
      await Users.findByIdAndDelete(userId)
      return res.status(200).json({ delete: userId })
    }

    res.status(400).json({ error: "User Not Selected...!" })
  } catch (error) {
    res.status(400).json(error)
  }
}

// District
//get:http://localhost:3000/api/users/district
export async function getDistrict(req: NextApiRequest, res: NextApiResponse) {
  try {
    const district = await District.find()
    if (!district) return res.status(404).json({ error: "Data Not Found" })

    res.status(200).json(district)
  } catch (error) {
    res.status(500).json(error)
  }
}
//post:http://localhost:3000/api/district
export async function postDistrict(req: NextApiRequest, res: NextApiResponse) {
  try {
    const formData = req.body
    if (!formData)
      return res.status(400).json({ error: "Form Data Not Provided...!" })

    const district = await District.create(formData)
    if (district) res.status(200).json({ data: district })
    else res.status(400).json({})
  } catch (error) {
    res.status(500).json(error)
  }
}

// Ward
//get:http://localhost:3000/api/users/ward
export async function getWard(req: NextApiRequest, res: NextApiResponse) {
  try {
    const ward = await Ward.find().populate("idDistrict")
    if (!ward) return res.status(404).json({ error: "Data Not Found" })

    res.status(200).json(ward)
  } catch (error) {
    res.status(500).json(error)
  }
}
//post:http://localhost:3000/api/district
export async function postWard(req: NextApiRequest, res: NextApiResponse) {
  try {
    const formData = req.body
    if (!formData)
      return res.status(400).json({ error: "Form Data Not Provided...!" })

    const ward = await Ward.create(formData)
    if (ward) res.status(200).json({ data: ward })
    else res.status(400).json({})
  } catch (error) {
    res.status(500).json(error)
  }
}

//get:http://localhost:3000/api/user/search
export async function getUserSearch(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { key } = req.query
    console.log(key)
    const user = await Users.find({
      createdAt: {
        $gte: new Date(key + "-01"),
        $lte: new Date(key + "-30"),
      },
    })
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
}
