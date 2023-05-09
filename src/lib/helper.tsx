const BASE_URL = "http://localhost:3000"

import { signIn } from "next-auth/react"

// User
//all user
export const getUser = async () => {
  const response = await fetch(`${BASE_URL}/api/user`)
  const json = await response.json()

  return json
}

//single user
export const getUserId = async (userId: string) => {
  const response = await fetch(`${BASE_URL}/api/user/${userId}`)
  const json = await response.json()

  if (json) return json
  return {}
}

//posting new user
export async function addUser(formData: any) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }

    const response = await fetch(`${BASE_URL}/api/user`, Options)
    const json = await response.json()

    return json
  } catch (error) {
    return error
  }
}

//update user
export async function updateUser({ userId, formData }: any) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  }

  const response = await fetch(
    `${BASE_URL}/api/user/?userId=${userId}`,
    Options
  )
  const json = await response.json()

  return json
}

//delete user
export async function deleteUser(userId: string) {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }

  const response = await fetch(
    `${BASE_URL}/api/user/?userId=${userId}`,
    Options
  )
  const json = await response.json()

  return json
}

// category
// all category
export const getCategory = async () => {
  const response = await fetch(`${BASE_URL}/api/category`)
  const json = await response.json()

  return json
}

//single category
export const getCategoryId = async (categoryId: string) => {
  const response = await fetch(`${BASE_URL}/api/category/${categoryId}`)
  const json = await response.json()

  if (json) return json
  return {}
}

//posting new category
export async function addCategory(formData: any) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }

    const response = await fetch(`${BASE_URL}/api/category`, Options)
    const json = await response.json()

    return json
  } catch (error) {
    return error
  }
}

//update category
export async function updateCategory({ categoryId, formData }: any) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  }
  const response = await fetch(
    `${BASE_URL}/api/category/?categoryId=${categoryId}`,
    Options
  )
  const json = await response.json()

  return json
}

//delete category
export async function deleteCategory(categoryId: string) {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }
  const response = await fetch(
    `${BASE_URL}/api/category/?categoryId=${categoryId}`,
    Options
  )
  const json = await response.json()

  return json
}

// post
//all post
export const getPost = async () => {
  const response = await fetch(`${BASE_URL}/api/post`)
  const json = await response.json()

  return json
}

//single Post
export const getPostId = async (postId: string) => {
  const response = await fetch(`${BASE_URL}/api/post/${postId}`)
  const json = await response.json()

  if (json) return json
  return {}
}

//posting new user
export async function addPost(formData: any) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }
    const response = await fetch(`${BASE_URL}/api/post`, Options)
    const json = await response.json()

    return json
  } catch (error) {
    return error
  }
}

export async function updatePost({ postId, formData }: any) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  }
  const response = await fetch(
    `${BASE_URL}/api/post/?postId=${postId}`,
    Options
  )
  const json = await response.json()

  return json
}

//delete post
export async function deletePost(postId: string) {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }

  const response = await fetch(
    `${BASE_URL}/api/post/?postId=${postId}`,
    Options
  )
  const json = await response.json()

  return json
}

export const loginUser = async ({ email, password }: any) => {
  const res = await signIn("credentials", {
    redirect: false,
    email,
    password,
  })

  return res
}

//store
//get all store
export const getStore = async () => {
  const response = await fetch(`${BASE_URL}/api/store`)
  const json = await response.json()

  return json
}

//post store
export async function addStore(formData: any) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }
    const response = await fetch(`${BASE_URL}/api/store`, Options)
    const json = await response.json()

    return json
  } catch (error) {
    return error
  }
}

//put store
export async function updateStore({ storeId, formData }: any) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  }
  const response = await fetch(
    `${BASE_URL}/api/store/?storeId=${storeId}`,
    Options
  )
  const json = await response.json()

  return json
}

//get by userId
export const getStoreUserId = async (userId: string) => {
  const response = await fetch(`${BASE_URL}/api/store/${userId}`)
  const json = await response.json()

  if (json) return json
  return {}
}

//certificateReg
//all certificateReg
export const getCertificateReg = async () => {
  const response = await fetch(`${BASE_URL}/api/certificateReg`)
  const json = await response.json()

  return json
}
//post certificateReg
export async function addCertificateReg(formData: any) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }
    const response = await fetch(`${BASE_URL}/api/certificateReg`, Options)
    const json = await response.json()

    return json
  } catch (error) {
    return error
  }
}

//inspectionPlan
//post inspectionPlan
export async function addInspectionPlan(formData: any) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }
    const response = await fetch(`${BASE_URL}/api/inspectionPlan`, Options)
    const json = await response.json()

    return json
  } catch (error) {
    return error
  }
}
