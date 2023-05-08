// user controller

import CertificateRegistration from "@/model/CertificateRegistration"
import Store from "@/model/Store"
import { NextApiRequest, NextApiResponse } from "next"

//get:http://localhost:3000/api/store
export async function getStore(req: NextApiRequest, res: NextApiResponse) {
  try {
    const store = await Store.find()
    if (!store) return res.status(404).json({ error: "Data Not Found" })

    res.status(200).json(store)
  } catch (error) {
    res.status(500).json(error)
  }
}

//get:http://localhost:3000/store/userId
export async function getStoreUserId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId } = req.query
    if (userId) {
      const user = await Store.find({ idUser: userId })
      res.status(200).json(user)
    }
    res.status(400).json({ error: req.query })
  } catch (error) {
    res.status(500).json(error)
  }
}

//post:http://localhost:3000/api/store
export async function postStore(req: NextApiRequest, res: NextApiResponse) {
  try {
    const formData = req.body
    if (!formData)
      return res.status(400).json({ error: "Form Data Not Provided...!" })

    const store = await Store.create(formData)
    if (store) res.status(200).json({ data: store })
    else res.status(400).json({})
  } catch (error) {
    res.status(500).json(error)
  }
}

// //put:http://localhost:3000/api/users/1
// export async function putUser(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const { userId } = req.query
//     const formData = req.body

//     if (userId && formData) {
//       await Users.findByIdAndUpdate(userId, formData)
//       return res.status(200).json(formData)
//     }
//     res.status(400).json({ error: "User Not Selected...!" })
//   } catch (error) {
//     res.status(400).json(error)
//   }
// }

// //delete:http://localhost:3000/api/users/1
// export async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const { userId } = req.query
//     console.log(userId)
//     if (userId) {
//       await Users.findByIdAndDelete(userId)
//       return res.status(200).json({ delete: userId })
//     }

//     res.status(400).json({ error: "User Not Selected...!" })
//   } catch (error) {
//     res.status(400).json(error)
//   }
// }

//get:http://localhost:3000/api/CertificateReg
export async function getCertificateReg(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const certificateReg = await CertificateRegistration.find()
    if (!certificateReg)
      return res.status(404).json({ error: "Data Not Found" })

    res.status(200).json(certificateReg)
  } catch (error) {
    res.status(500).json(error)
  }
}
//post:http://localhost:3000/api/CertificateReg
export async function postCertificateReg(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const formData = req.body
    if (!formData)
      return res.status(400).json({ error: "Form Data Not Provided...!" })

    const certificateReg = await CertificateRegistration.create(formData)
    if (certificateReg) res.status(200).json({ data: certificateReg })
    else res.status(400).json({})
  } catch (error) {
    res.status(500).json(error)
  }
}
