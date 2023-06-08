import CertificateRegistration from "@/model/CertificateRegistration"
import Store from "@/model/Store"
import { NextApiRequest, NextApiResponse } from "next"
import mongoose from "mongoose"

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
      const store = await Store.find({
        idUser: userId,
      })
      res.status(200).json(store)
    }
    res.status(400).json({ error: req.query })
  } catch (error) {
    res.status(500).json(error)
  }
}

//get:http://localhost:3000/store/storeId
export async function getStoreId(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { storeId } = req.query
    if (storeId) {
      const store = await Store.findById(storeId)
      res.status(200).json(store)
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

//put:http://localhost:3000/api/store
export async function putStore(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { storeId } = req.query
    const formData = req.body

    if (storeId && formData) {
      await CertificateRegistration.findByIdAndUpdate(storeId, formData)
      return res.status(200).json(formData)
    }
    res.status(400).json({ error: "User Not Selected...!" })
  } catch (error) {
    res.status(400).json(error)
  }
}

//delete:http://localhost:3000/api/store/1
export async function deleteStore(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { storeId } = req.query
    if (storeId) {
      await Store.findByIdAndDelete(storeId)
      return res.status(200).json({ delete: storeId })
    }

    res.status(400).json({ error: "User Not Selected...!" })
  } catch (error) {
    res.status(400).json(error)
  }
}

//get:http://localhost:3000/api/certificateReg
export async function getCertificateReg(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const certificateReg = await CertificateRegistration.find().populate(
      "idStore"
    )
    if (!certificateReg)
      return res.status(404).json({ error: "Data Not Found" })

    res.status(200).json(certificateReg)
  } catch (error) {
    res.status(500).json(error)
  }
}
//post:http://localhost:3000/api/certificateReg
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

//put:http://localhost:3000/api/certificateReg
export async function putCertificateReg(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { storeId } = req.query
    const formData = req.body

    if (storeId && formData) {
      await CertificateRegistration.findOneAndUpdate(
        { idStore: storeId },
        formData
      )
      return res.status(200).json(formData)
    }
    res.status(400).json({ error: "CertificateRegistration Not Selected...!" })
  } catch (error) {
    res.status(400).json(error)
  }
}

//delete:http://localhost:3000/api/certificateReg/1
export async function deleteCertificateReg(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { cerId } = req.query
    if (cerId) {
      await CertificateRegistration.findByIdAndDelete(cerId)
      return res.status(200).json({ delete: cerId })
    }

    res.status(400).json({ error: "User Not Selected...!" })
  } catch (error) {
    res.status(400).json(error)
  }
}

//get:http://localhost:3000/api/store/search
export async function getStoreSearch(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { key } = req.query
    const criteria = []
    if (key) criteria.push({ name: new RegExp(`${key as string}`, "i") })

    const query = criteria.length > 0 ? { $or: criteria } : {}
    const store = await Store.find(query).sort({ createdAt: -1 })
    res.status(200).json(store)
  } catch (error) {
    res.status(500).json(error)
  }
}
