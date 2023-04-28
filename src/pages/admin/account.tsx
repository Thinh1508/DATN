import { useState } from "react"
import { NextPageWithLayout } from "../_app"

import { RiAddCircleLine } from "react-icons/ri"

import AdminLayout from "@/layouts/AdminLayout"
import Header from "@/feature/Admin/components/account/Header"
import Table from "@/feature/Admin/components/account/Table"

type Props = {}

const Account: NextPageWithLayout = (props: Props) => {
  const [isStatus, SetIsStatus] = useState("")
  const onChangeStatus = (status: string) => {
    SetIsStatus(status)
    console.log(status)
  }
  return (
    <div className="sm:p-8 p-4 bg-gray-300 h-screen w-full overflow-y-auto scrollbar-style">
      <h1 className="p-4 sm:p-0 text-2xl font-semibold uppercase text-gray-700">
        Tài khoản
      </h1>
      <Header onChange={onChangeStatus} />
      <Table status={isStatus} />
    </div>
  )
}
Account.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default Account
