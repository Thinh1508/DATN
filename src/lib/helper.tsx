const BASE_URL = "http://localhost:3000"

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
  console.log(postId, formData)
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
