import { getSession } from "next-auth/react"
import { useRouter } from "next/router"

const checkAuth = (handler: any) => async (context: any) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: `/login?pathName=${context.resolvedUrl}`,
        permanent: false,
      },
    }
  }

  return handler(context)
}

export default checkAuth
