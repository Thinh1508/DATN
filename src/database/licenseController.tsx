import License from "@/model/License"
import { NextApiRequest, NextApiResponse } from "next"

//get:http://localhost:3000/api/license
export async function getLicense(req: NextApiRequest, res: NextApiResponse) {
  try {
    const license = await License.find()
    if (!license) return res.status(404).json({ error: "Data Not Found" })

    res.status(200).json(license)
  } catch (error) {
    res.status(500).json(error)
  }
}

//get:http://localhost:3000/api/license/id
export async function getLicenseId(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query
    if (id) {
      const license = await License.findOne({ idStore: id })
      res.status(200).json(license)
    }
    res.status(400).json({ error: "license Not Selected...!" })
  } catch (error) {
    res.status(500).json(error)
  }
}

//post:http://localhost:3000/api/license
export async function postLicense(req: NextApiRequest, res: NextApiResponse) {
  try {
    const formData = req.body
    if (!formData)
      return res.status(400).json({ error: "Form Data Not Provided...!" })

    const license = await License.create(formData)
    if (license) res.status(200).json({ data: license })
    else res.status(400).json({})
  } catch (error) {
    res.status(500).json(error)
  }
}

//put http://localhost:3000/api/license
export async function putLicense(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { licenseId } = req.query
    const formData = req.body

    if (licenseId && formData) {
      await License.findByIdAndUpdate(licenseId, formData)
      return res.status(200).json(formData)
    }
    res.status(400).json({ error: "license Not Selected...!" })
  } catch (error) {
    res.status(400).json(error)
  }
}

//delete:http://localhost:3000/api/license
export async function deleteLicense(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { licenseId } = req.query
    console.log(licenseId)
    if (licenseId) {
      await License.findByIdAndDelete(licenseId)
      return res.status(200).json({ delete: licenseId })
    }

    res.status(400).json({ error: "license Not Selected...!" })
  } catch (error) {
    res.status(400).json(error)
  }
}
