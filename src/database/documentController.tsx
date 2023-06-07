import Document from "@/model/Document"
import { NextApiRequest, NextApiResponse } from "next"

//get:http://localhost:3000/api/document
export async function getDocument(req: NextApiRequest, res: NextApiResponse) {
  try {
    const document = await Document.find().populate("idUser", "name")
    if (!document) return res.status(404).json({ error: "Data Not Found" })

    res.status(200).json(document)
  } catch (error) {
    res.status(500).json(error)
  }
}

//get:http://localhost:3000/api/document/top5
export async function getDocumentTop5(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const document = await Document.find().sort({ createdAt: -1 }).limit(5)
    if (!document) return res.status(404).json({ error: "Data Not Found" })

    res.status(200).json(document)
  } catch (error) {
    res.status(500).json(error)
  }
}

//get:http://localhost:3000/api/document/id
export async function getDocumentId(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { documentId } = req.query
    if (documentId) {
      const document = await Document.findById(documentId)
      res.status(200).json(document)
    }
    res.status(400).json({ error: "Document Not Selected...!" })
  } catch (error) {
    res.status(500).json(error)
  }
}

//post:http://localhost:3000/api/document
export async function postDocument(req: NextApiRequest, res: NextApiResponse) {
  try {
    const formData = req.body
    if (!formData)
      return res.status(400).json({ error: "Form Data Not Provided...!" })

    const document = await Document.create(formData)
    if (document) res.status(200).json({ data: document })
    else res.status(400).json({})
  } catch (error) {
    res.status(500).json(error)
  }
}

//post:http://localhost:3000/api/post/view
export async function postDocumentView(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const category = req.body
    if (!category) return res.status(400).json({ error: category })
    const post = await Document.find({
      category: category,
      status: "active",
    }).limit(10)
    if (!post) return res.status(404).json({ error: "Data Not Found" })
    res.status(200).json(post)
  } catch (error) {
    res.status(501).json(error)
  }
}

//put http://localhost:3000/api/document
export async function putDocument(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { documentId } = req.query
    const formData = req.body

    if (documentId && formData) {
      await Document.findByIdAndUpdate(documentId, formData)
      return res.status(200).json(formData)
    }
    res.status(400).json({ error: "Document Not Selected...!" })
  } catch (error) {
    res.status(400).json(error)
  }
}

//delete:http://localhost:3000/api/document
export async function deleteDocument(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { documentId } = req.query
    console.log(documentId)
    if (documentId) {
      await Document.findByIdAndDelete(documentId)
      return res.status(200).json({ delete: documentId })
    }

    res.status(400).json({ error: "Document Not Selected...!" })
  } catch (error) {
    res.status(400).json(error)
  }
}
