import { getSession } from "next-auth/react"
import { useRouter } from "next/router"

const checkAdmin = (WrappedPage: any) => {
  const WithAuth = (props: any) => {
    const router = useRouter()

    // Check if user is not authenticated
    const session = getSession()
    if (!session) {
      // Redirect to login page
      router.replace("/login")
      return null
    }

    // User is authenticated, pass props to WrappedPage
    return <WrappedPage {...props} />
  }

  if (WrappedPage.getInitialProps) {
    WithAuth.getInitialProps = WrappedPage.getInitialProps
  }

  return WithAuth
}

export default checkAdmin
