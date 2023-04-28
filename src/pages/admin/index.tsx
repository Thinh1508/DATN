import type { NextPageWithLayout } from "../_app"

import AdminLayout from "@/layouts/AdminLayout"
import TopCards from "@/feature/Admin/components/statistical/TopCards"
import BarChart from "@/feature/Admin/components/statistical/BarChart.jsx"
import RecentOrders from "@/feature/Admin/components/statistical/RecentOrders"

type Props = {}

const Dashboard: NextPageWithLayout = () => {
  return (
    <div className="sm:p-8 p-4 bg-gray-200 h-screen w-full overflow-y-auto">
      <h1 className="p-4 sm:p-0 text-2xl font-semibold uppercase text-gray-700">
        Thống kê
      </h1>
      <TopCards />
      <div className="pt-4 grid md:grid-cols-3 grid-cols-1 gap-4">
        <BarChart />
        <RecentOrders />
      </div>
    </div>
  )
}

Dashboard.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default Dashboard
