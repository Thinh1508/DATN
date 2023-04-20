import SideBar from "@/feature/Admin/components/SideBar"

type Props = {
  children: React.ReactNode
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <SideBar />
      {children}
    </div>
  )
}

export default AdminLayout
