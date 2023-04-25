const BASE_URL = "http://localhost:3000"

//all user
export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/api/users`)
  const json = await response.json()

  return json
}

//single user
export const getUser = async (userId: string) => {
  const response = await fetch(`${BASE_URL}/api/users/${userId}`)
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

    const response = await fetch(`${BASE_URL}/api/users`, Options)
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
    `${BASE_URL}/api/users/?userId=${userId}`,
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
    `${BASE_URL}/api/users/?userId=${userId}`,
    Options
  )
  const json = await response.json()

  return json
}

// all category
export const getCategory = async () => {
  const response = await fetch(`${BASE_URL}/api/categorys`)
  const json = await response.json()

  return json
}
