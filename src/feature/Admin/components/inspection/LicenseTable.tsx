import React, { useState } from "react"
import Link from "next/link"

import { BiEdit, BiTrashAlt } from "react-icons/bi"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { useQuery, useQueryClient } from "react-query"
import { getCertificateReg } from "@/lib/helper"
import ModalShowLicense from "./ModalShowLicense"
// import Modal from "./Modal"

type Props = {}
type License = {
  _id: string
  idStore: {
    _id: string
    idUser: string
    name: string
    imageBusiness: string
    type: string
    address: string
    status: string
  }
  proposal: string
  description: string
  healthCertificate: string
  trainCertificate: string
  status: string
  createdAt: string
}

const LicenseTable = (props: Props) => {
  const queryClient = useQueryClient()
  const { isLoading, isError, data, error } = useQuery(
    "certificateReg",
    getCertificateReg
  )

  const [licenseData, setLicenseData] = useState(Object)
  const [showModal, setShowModal] = useState(false)

  const handleOnClose = () => {
    setShowModal(false)
  }

  if (isLoading) return <div>Đang tải dữ liệu...</div>
  if (isError) return <div>Lỗi khi tải dữ liệu {`${error}`}</div>
  return (
    <div className="bg-white w-full border p-4 mt-4  rounded-lg h-[84vh] xl:h-[82vh] ">
      <div className="max-h-[91%] overflow-y-auto scrollbar-style">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-300 uppercase bg-gray-900 sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-4 py-3 xl:text-lg cursor-pointer">
                Tên cơ sở
              </th>
              <th scope="col" className="px-4 py-3 xl:text-lg cursor-pointer">
                Loại hình kinh doanh
              </th>
              <th scope="col" className="px-4 py-3 xl:text-lg cursor-pointer">
                Địa chỉ
              </th>
              <th scope="col" className="px-4 py-3 xl:text-lg cursor-pointer">
                Ngày đăng kí
              </th>
              <th scope="col" className="px-4 py-3 xl:text-lg cursor-pointer">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              (license: License) =>
                license.status !== "processed" && (
                  <tr
                    className="bg-gray-200 border-b text-gray-900 hover:bg-gray-300"
                    key={license._id}
                    onClick={() => {
                      setLicenseData(license)
                      setShowModal(true)
                    }}
                  >
                    <th
                      scope="row"
                      className="px-4 py-4 font-medium  whitespace-nowrap text-lg cursor-pointer capitalize"
                    >
                      {license.idStore.name}
                    </th>
                    <td className="px-4 py-4 text-lg cursor-pointer capitalize">
                      {license.idStore.type}
                    </td>
                    <td className="px-4 py-4 text-lg cursor-pointer capitalize">
                      {license.idStore.address}
                    </td>
                    <td className="px-4 py-4 text-lg cursor-pointer capitalize">
                      {license.createdAt.slice(0, 10)}
                    </td>
                    <td className="px-4 py-4 text-lg cursor-pointer capitalize">
                      {license.status === "pending"
                        ? "Đợi sử lý"
                        : "Đang kiểm tra"}
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
      {/* <div className="mt-7 w-full h-fit flex flex-row sm:justify-end justify-center">
        <nav className="">
          <ul className="inline-flex -space-x-px">
            <li>
              <Link
                href={"/admin/document"}
                className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
              >
                Previous
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
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                ...
              </Link>
            </li>
            <li>
              <Link
                href={"/admin/document"}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                10
              </Link>
            </li>
            <li>
              <Link
                href={"/admin/document"}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
              >
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </div> */}
      <ToastContainer />
      {showModal && (
        <ModalShowLicense
          onClose={handleOnClose}
          visible={showModal}
          licenseData={licenseData}
        />
      )}
    </div>
  )
}

export default LicenseTable
