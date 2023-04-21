import type { NextPageWithLayout } from "../_app"

import AdminLayout from "@/layouts/AdminLayout"
import TopCards from "@/feature/Admin/components/TopCards"
import BarChart from "@/feature/Admin/components/BarChart.jsx"
import RecentOrders from "@/feature/Admin/components/RecentOrders"

type Props = {}

const Dashboard: NextPageWithLayout = () => {
  return (
    <div className="p-8 bg-gray-200 h-screen w-full">
      <h1 className="text-2xl font-semibold uppercase text-gray-700">
        statistical
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
