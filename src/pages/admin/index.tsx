import type { NextPageWithLayout } from "../_app"
import { useState } from "react"

import AdminLayout from "@/layouts/AdminLayout"
import TopCards from "@/feature/Admin/components/statistical/TopCards"
import BarChart from "@/feature/Admin/components/statistical/BarChart.jsx"
import RecentOrders from "@/feature/Admin/components/statistical/RecentOrders"

type Props = {}

const Dashboard: NextPageWithLayout = () => {
  const today: Date = new Date()
  const month: number = today.getMonth() + 1
  const year: number = today.getFullYear()
  const todayString: string = `${year}-${month < 10 ? "0" + month : month}`
  const [date, setDate] = useState(todayString)
  const changeDate = (date: string) => {
    setDate(date)
  }
  return (
    <div className="sm:p-8 p-4 bg-gray-200 h-screen w-full overflow-y-auto">
      <h1 className="p-4 sm:p-0 text-2xl font-semibold uppercase text-gray-700">
        Thống kê
      </h1>
      <TopCards date={date} changeDate={changeDate} />
      <div className="pt-4 grid md:grid-cols-3 grid-cols-1 gap-4">
        <BarChart />
        <RecentOrders date={date} />
      </div>
    </div>
  )
}

Dashboard.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default Dashboard
