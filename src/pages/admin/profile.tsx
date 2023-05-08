import React from "react"
import { NextPageWithLayout } from "../_app"

import AdminLayout from "@/layouts/AdminLayout"

type Props = {}

const Profile: NextPageWithLayout = (props: Props) => {
  return (
    <div className="sm:p-8 p-4 bg-gray-300 h-screen w-full overflow-y-auto">
      <h1 className="p-4 sm:p-0 text-2xl font-semibold uppercase text-gray-700">
        Trang cá nhân
      </h1>
    </div>
  )
}

Profile.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default Profile
