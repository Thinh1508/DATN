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
  if (session && session.user.permissions === "admin") {
    console.log(session.user.permissions !== "admin")
    return (
      <div className="flex h-screen">
        <SideBar />
        {children}
      </div>
    )
  }

  return <ErrorPage />
}
export default AdminLayout
