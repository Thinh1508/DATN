import React from "react"
import { NextPageWithLayout } from "../_app"

import AdminLayout from "@/layouts/AdminLayout"
import Table from "@/feature/Admin/components/inspection/Table"

type Props = {}

const Inspection: NextPageWithLayout = (props: Props) => {
  return (
    <div className="sm:p-8 p-4 bg-gray-300 h-screen w-full overflow-y-auto">
      <h1 className="p-4 sm:p-0 text-2xl font-semibold uppercase text-gray-700">
        Thanh tra
      </h1>
      <Table />
    </div>
  )
}

Inspection.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default Inspection
