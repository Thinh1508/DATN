import type { NextPageWithLayout } from "../_app"

import AdminLayout from "@/layouts/AdminLayout"

type Props = {}

const Dashboard: NextPageWithLayout = () => {
  return (
    <div className="p-7">
      <h1 className="text-2xl font-semibold">dashboard</h1>
    </div>
  )
}

Dashboard.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default Dashboard
