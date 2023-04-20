import { NextPageWithLayout } from "../_app"

import AdminLayout from "@/layouts/AdminLayout"

type Props = {}

const Account: NextPageWithLayout = (props: Props) => {
  return <div>Account</div>
}
Account.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default Account
