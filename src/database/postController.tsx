// user controller

import Post from "@/model/Post"
import { NextApiRequest, NextApiResponse } from "next"

//get:http://localhost:3000/api/post
export async function getPost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const post = await Post.find()
    if (!post) return res.status(404).json({ error: "Data Not Found" })

    res.status(200).json(post)
  } catch (error) {
    res.status(500).json(error)
  }
}

//get:http://localhost:3000/api/post/1
export async function getPostId(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { postId } = req.query
    if (postId) {
      const post = await Post.findById(postId)
      res.status(200).json(post)
    }
    res.status(400).json({ error: "User Not Selected...!" })
  } catch (error) {
    res.status(500).json(error)
  }
}

//post:http://localhost:3000/api/post
export async function postPost(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("cc")
    const formData = req.body
    if (!formData)
      return res.status(400).json({ error: "Form Data Not Provided...!" })
    const post = await Post.create(formData)
    if (post) res.status(200).json({ data: post })
    else res.status(400).json({})
  } catch (error) {
    res.status(501).json(error)
  }
}

//put:http://localhost:3000/api/post/1
export async function putPost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { postId } = req.query
    const formData = req.body

    if (postId && formData) {
      await Post.findByIdAndUpdate(postId, formData)
      return res.status(200).json(formData)
    }
    res.status(400).json({ error: "User Not Selected...!" })
  } catch (error) {
    res.status(400).json(error)
  }
}

//delete:http://localhost:3000/api/post/1
export async function deletePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { postId } = req.query
    console.log(postId)
    if (postId) {
      await Post.findByIdAndDelete(postId)
      return res.status(200).json({ delete: postId })
    }

    res.status(400).json({ error: "User Not Selected...!" })
  } catch (error) {
    res.status(400).json(error)
  }
}
