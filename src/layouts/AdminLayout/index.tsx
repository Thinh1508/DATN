import SideBar from "@/feature/Admin/SideBar"

type Props = {
  children: React.ReactNode
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen">
      <SideBar />
      {children}
    </div>
  )
}

export default AdminLayout
