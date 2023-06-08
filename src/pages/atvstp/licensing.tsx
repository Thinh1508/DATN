import SideBar from "@/layouts/SideBar"
import { getInspectionResult, getStore } from "@/lib/helper"
import Link from "next/link"
import React from "react"

type Props = {
  data: any
}

const Licensing = ({ data }: Props) => {
  const dataStore = () => {
    const stores = data
    return stores.filter((store: any) => store.content === "3")
  }
  return (
    <div className="bg-white flex-1">
      <div className="grid grid-cols-10 space-x-8 pt-4 container mx-auto scrollbar-style ">
        <div className="col-span-10 lg:col-span-7 mb-4 bg-white  shadow-xl h-fit">
          <div className="border-t-4 border-t-[#049803] mt-2 pt-2 text-gray-950 px-2">
            <div className="flex flex-row items-center my-2 ">
              <div>
                <span
                  className={`text-gray-900 p-2
              font-semibold text-xl mr-4 cursor-pointer relative `}
                >
                  Danh sách cơ sở được cấp giấy chứng nhận
                </span>
              </div>
            </div>
            <hr />
            <div className="mb-2 mt-7 px-2 ">
              <table className="border border-collapse w-full">
                <thead className="border">
                  <tr>
                    <th className="border w-[4%] p-2">Stt</th>
                    <th className="border w-2/6 p-2">Tên cơ sở</th>
                    <th className="border w-3/6 p-2">Địa chỉ</th>
                    <th className="border w-1/6 p-2">Ngày cấp</th>
                  </tr>
                </thead>
                <tbody>
                  {dataStore() &&
                    dataStore().map((report: any, index: number) => (
                      <tr key={report._id}>
                        <td className="border pl-1 py-2">{index + 1}</td>
                        <td className="border pl-1 py-2">
                          <Link
                            href={{
                              pathname: "/storeDetail",
                              query: {
                                storeId: report.store._id,
                              },
                            }}
                            className="text-blue-600 hover:text-red-500"
                          >
                            {report.store.name}
                          </Link>
                        </td>
                        <td className="border pl-1 py-2">
                          {report.store.address.street +
                            ", " +
                            report.store.address.ward +
                            ", " +
                            report.store.address.district +
                            ", Đà Nẵng"}
                        </td>
                        <td className="border pl-1">
                          {report.updatedAt.substring(0, 10)}
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

export async function getServerSideProps() {
  const data = await getInspectionResult()
  const dataStore = await getStore()

  dataStore.map((store: any) => {
    data.map((report: any) => {
      if (report.idInspectionPlan.idStore === store._id) {
        report.store = store
      }
    })
  })

  return { props: { data } }
}

export default Licensing
