import React from "react"
import { NextPageWithLayout } from "../_app"

import AdminLayout from "@/layouts/AdminLayout"
import Table from "@/feature/Admin/components/post/Table"

type Props = {}

const Post: NextPageWithLayout = (props: Props) => {
  return (
    <div className="sm:p-8 py-4 bg-gray-300 h-screen w-full overflow-y-auto">
      <div className="flex flex-row">
        <h1 className="p-4 sm:p-0 text-2xl font-semibold uppercase text-gray-700">
          Bài viết
        </h1>
      </div>
      <Table />
    </div>
  )
}

Post.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default Post
