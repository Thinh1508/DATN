import SideBar from "@/layouts/SideBar"
import { getCertificateReg, getLicense } from "@/lib/helper"
import { useSession } from "next-auth/react"
import Link from "next/link"
import React, { useState } from "react"
import ModalShowLicense from "./ModalShowLicense"

type Props = {
  data: any
}

const ShowLicense = ({ data }: Props) => {
  const { data: session }: { data: any } = useSession()
  const dataLicense = data.filter(
    (license: any) => license.idStore.idUser === session?.user?._id
  )

  const [show, setShow] = useState(false)
  const [idPlan, setIdPlan] = useState("")
  const handleOnClose = () => {
    setShow(false)
  }

  return (
    <div className="bg-white flex-1">
      <div className="grid grid-cols-10 space-x-8 pt-4 container mx-auto scrollbar-style ">
        <div className="col-span-10 lg:col-span-7 mb-4 bg-white  shadow-xl h-fit">
          <div className="border-t-4 border-t-[#049803] mt-2 pt-2 text-gray-950 px-2">
            <div className="flex flex-row items-center my-2 ">
              <div onClick={() => setShow(!show)}>
                <span
                  className={`
                    text-gray-700  p-2
                   font-semibold text-xl mr-4 cursor-pointer relative `}
                >
                  Danh sách đăng kí
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
                    <th className="border w-1/6 p-2">Ngày đăng kí</th>
                    <th className="border w-1/6 p-2">Tình trạng</th>
                  </tr>
                </thead>
                <tbody>
                  {dataLicense &&
                    dataLicense.map((report: any, index: number) => (
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
                            : ""}
                          {report.status === "checked" && (
                            <h1
                              className="text-red-700 hover:text-blue-500 cursor-pointer"
                              onClick={() => {
                                setIdPlan(report.idPlan)
                                setShow(true)
                              }}
                            >
                              Xem kết quả
                            </h1>
                          )}
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
      {show && <ModalShowLicense idPlan={idPlan} onClose={handleOnClose} />}
    </div>
  )
}

export async function getServerSideProps() {
  const data = await getCertificateReg()

  return { props: { data } }
}

export default ShowLicense
