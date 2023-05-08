import SideBar from "@/feature/Admin/SideBar"
import ErrorPage from "@/pages/_error"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

type Props = {
  children: React.ReactNode
}

const AdminLayout = ({ children }: Props) => {
  const router = useRouter()
  const { data: session, status }: { data: any; status: string } = useSession()

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login")
  }, [session])

  if (status === "authenticated") {
    if (session.user.permissions === "admin") {
      return (
        <div className="flex h-screen">
          <SideBar />
          {children}
        </div>
      )
    } else {
      return <ErrorPage />
    }
  }
  return <></>
}
export default AdminLayout
