import React from "react"
import { NextPageWithLayout } from "@/pages/_app"

import AdminLayout from "@/layouts/AdminLayout"
import LicenseTable from "@/feature/Admin/components/inspection/LicenseTable"

type Props = {}

const LicenseAdmin: NextPageWithLayout = (props: Props) => {
  return (
    <div className="sm:p-8 p-4 bg-gray-300 h-screen w-full overflow-y-auto">
      <h1 className="p-4 sm:p-0 text-2xl font-semibold uppercase text-gray-700">
        Danh sách đăng kí cấp giấy chứng nhận an toàn vệ sinh thực phẩm
      </h1>
      <LicenseTable />
    </div>
  )
}

LicenseAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default LicenseAdmin
