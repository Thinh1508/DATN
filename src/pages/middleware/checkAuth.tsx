import { getSession } from "next-auth/react"

const checkAuth = (handler: any) => async (context: any) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  return handler(context)
}

export default checkAuth
