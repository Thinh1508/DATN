import SideBar from "@/layouts/SideBar"
import { getReport } from "@/lib/helper"
import { useSession } from "next-auth/react"
import Link from "next/link"
import React from "react"

type Props = {
  data: any
}

const ShowReport = ({ data }: Props) => {
  const { data: session }: { data: any } = useSession()
  const dataReport = data.filter(
    (report: any) => report.idUser._id === session?.user?._id
  )
  return (
    <div className="bg-white flex-1">
      <div className="grid grid-cols-10 space-x-8 pt-4 container mx-auto scrollbar-style ">
        <div className="col-span-10 lg:col-span-7 mb-4 bg-white  shadow-xl h-fit">
          <div className="border-t-4 border-t-[#049803] mt-2 pt-2 text-gray-950 px-2">
            <div className=" my-2 ">
              <div>
                <span
                  className={`
                         text-gray-900  p-2
                       font-semibold text-xl mr-4 cursor-pointer relative `}
                >
                  Danh sách báo cáo
                </span>
              </div>
            </div>
            <hr />
            <div className="mb-2 mt-7 px-2 ">
              <table className="border border-collapse w-full">
                <thead className="border">
                  <tr>
                    <th className="border w-[4%] p-2">Stt</th>
                    <th className="border w-1/6 p-2">Tên cơ sở</th>
                    <th className="border w-2/6 p-2">Địa chỉ</th>
                    <th className="border w-1/6 p-2">Ngày báo cáo</th>
                    <th className="border w-1/6 p-2">Tình trạng</th>
                  </tr>
                </thead>
                <tbody>
                  {dataReport &&
                    dataReport.map((report: any, index: number) => (
                      <tr key={report._id}>
                        <td className="border pl-1 py-2">{index + 1}</td>
                        <td className="border pl-1 py-2">
                          {report.idStore.name}
                        </td>
                        <td className="border pl-1 py-2">
                          {report.idStore.address.street +
                            ", " +
                            report.idStore.address.ward +
                            ", " +
                            report.idStore.address.district +
                            ", Đà Nẵng"}
                        </td>
                        <td className="border pl-1 py-2">
                          {report.createdAt.substring(0, 10)}
                        </td>
                        <td className="border pl-1">
                          {report.status === "pending"
                            ? "Đợi xử lý"
                            : report.status === "checking"
                            ? "Đang xử lý"
                            : "Đã xử lý"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className=" p-5 w-full h-fit flex flex-row sm:justify-end justify-center">
              <nav className="">
                <ul className="inline-flex -space-x-px">
                  <li>
                    <Link
                      href={"/admin/document"}
                      className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                    >
                      Trước
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/admin/document"}
                      className="px-3 py-2 text-gray-600 border border-gray-300 bg-gray-200 hover:bg-gray-300 hover:text-blue-700"
                    >
                      1
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={"/admin/document"}
                      className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                    >
                      Sau
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <SideBar />
      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const data = await getReport()

  return { props: { data } }
}

export default ShowReport
