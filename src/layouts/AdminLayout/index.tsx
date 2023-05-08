import SideBar from "@/feature/Admin/SideBar"
import ErrorPage from "@/pages/_error"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

type Props = {
  children: React.ReactNode
}

const AdminLayout = ({ children }: Props) => {
  const router = useRouter()
  const { data: session }: { data: any } = useSession()
  if (session) {
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
  // router.replace("/login")
  return null
}
export default AdminLayout
