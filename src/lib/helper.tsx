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

//get store by userId
export const getStoreUserId = async (userId: string) => {
  const response = await fetch(`${BASE_URL}/api/store/${userId}`)
  const json = await response.json()

  if (json) return json
  return {}
}

//get store by storeId
export const getStoreId = async (storeId: string) => {
  const response = await fetch(`${BASE_URL}/api/store/view/?storeId=${storeId}`)
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

//put certificateReg
export async function updateCertificateReg({ storeId, formData }: any) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  }
  const response = await fetch(
    `${BASE_URL}/api/certificateReg/?storeId=${storeId}`,
    Options
  )
  const json = await response.json()

  return json
}

//inspectionPlan
// get all inspectionPlan
export const getInspectionPlan = async () => {
  const response = await fetch(`${BASE_URL}/api/inspectionPlan`)
  const json = await response.json()

  return json
}

// get one inspectionPlan
export const getInspectionPlanId = async (id: string) => {
  const response = await fetch(`${BASE_URL}/api/inspectionPlan/${id}`)
  const json = await response.json()

  if (json) return json
  return {}
}

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
//put inspectionPlan
export async function updateInspectionPlan({ planId, formData }: any) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  }
  const response = await fetch(
    `${BASE_URL}/api/inspectionPlan/?planId=${planId}`,
    Options
  )
  const json = await response.json()

  return json
}

//delete inspectionPlan
export async function deleteInspectionPlan(planId: string) {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }

  const response = await fetch(
    `${BASE_URL}/api/inspectionPlan/?planId=${planId}`,
    Options
  )
  const json = await response.json()

  return json
}

//report
//get all report
export const getReport = async () => {
  const response = await fetch(`${BASE_URL}/api/report`)
  const json = await response.json()

  return json
}

//post report
export async function addReport(formData: any) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }
    const response = await fetch(`${BASE_URL}/api/report`, Options)
    const json = await response.json()

    return json
  } catch (error) {
    return error
  }
}

//put report
export async function updateReport({ reportId, formData }: any) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  }
  const response = await fetch(
    `${BASE_URL}/api/report/?reportId=${reportId}`,
    Options
  )
  const json = await response.json()

  return json
}

//ward
//get all ward
export const getWard = async () => {
  const response = await fetch(`${BASE_URL}/api/user/ward`)
  const json = await response.json()

  return json
}

//inspectionResult
// get all inspectionResult
export const getInspectionResult = async () => {
  const response = await fetch(`${BASE_URL}/api/inspectionResult`)
  const json = await response.json()

  return json
}

// get one inspectionResult
export const getInspectionResultId = async (id: string) => {
  const response = await fetch(`${BASE_URL}/api/inspectionResult/${id}`)
  const json = await response.json()

  if (json) return json
  return {}
}

//post inspectionResult
export async function addInspectionResult(formData: any) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }
    const response = await fetch(`${BASE_URL}/api/inspectionResult`, Options)
    const json = await response.json()

    return json
  } catch (error) {
    return error
  }
}
//put inspectionResult
export async function updateInspectionResult({ resultId, formData }: any) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  }
  const response = await fetch(
    `${BASE_URL}/api/inspectionResult/?resultId=${resultId}`,
    Options
  )
  const json = await response.json()

  return json
}

//document
//all document
export const getDocument = async () => {
  const response = await fetch(`${BASE_URL}/api/document`)
  const json = await response.json()

  return json
}

//single document
export const getDocumentId = async (documentId: string) => {
  const response = await fetch(`${BASE_URL}/api/document/${documentId}`)
  const json = await response.json()

  if (json) return json
  return {}
}

//posting new document
export async function addDocument(formData: any) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }

    const response = await fetch(`${BASE_URL}/api/document`, Options)
    const json = await response.json()

    return json
  } catch (error) {
    return error
  }
}

//update document
export async function updateDocument({ documentId, formData }: any) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  }

  const response = await fetch(
    `${BASE_URL}/api/document/?documentId=${documentId}`,
    Options
  )
  const json = await response.json()

  return json
}

//delete document
export async function deleteDocument(documentId: string) {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }

  const response = await fetch(
    `${BASE_URL}/api/document/?documentId=${documentId}`,
    Options
  )
  const json = await response.json()

  return json
}

//license
//all license
export const getLicense = async () => {
  const response = await fetch(`${BASE_URL}/api/license`)
  const json = await response.json()

  return json
}

//single license
export const getLicenseId = async (licenseId: string) => {
  const response = await fetch(`${BASE_URL}/api/license/${licenseId}`)
  const json = await response.json()

  if (json) return json
  return {}
}

//posting new license
export async function addLicense(formData: any) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }

    const response = await fetch(`${BASE_URL}/api/license`, Options)
    const json = await response.json()

    return json
  } catch (error) {
    return error
  }
}

//update document
export async function updateLicense({ licenseId, formData }: any) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  }

  const response = await fetch(
    `${BASE_URL}/api/license/?licenseId=${licenseId}`,
    Options
  )
  const json = await response.json()

  return json
}

// get document top 5
export async function getDocumentTop5() {
  const response = await fetch(`${BASE_URL}/api/document/top5`)
  const json = await response.json()

  return json
}

//get search
export const getPostSearch = async (key: string) => {
  const response = await fetch(`${BASE_URL}/api/post/search/?key=${key}`)
  const json = await response.json()

  if (json) return json
  return {}
}
