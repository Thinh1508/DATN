import { NextPageWithLayout } from "../_app"

import AdminLayout from "@/layouts/AdminLayout"

type Props = {}

const Account: NextPageWithLayout = (props: Props) => {
  return (
    <div className="p-8 bg-white h-full w-full">
      <h1 className="text-2xl font-semibold uppercase text-gray-700">
        account
      </h1>
    </div>
  )
}
Account.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default Account
