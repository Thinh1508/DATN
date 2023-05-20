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
    address: {
      district: string
      ward: string
      street: string
    }
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
  const [showData, setShowData] = useState(false)

  const handleOnClose = () => {
    setShowModal(false)
  }

  const tableBody = () => {
    const licenseData = data
    if (!showData) {
      return licenseData.filter((license: any) => license.status !== "checked")
    }
    return licenseData.filter((license: any) => license.status === "checked")
  }

  if (isLoading) return <div>Đang tải dữ liệu...</div>
  if (isError) return <div>Lỗi khi tải dữ liệu {`${error}`}</div>
  return (
    <div className="bg-white w-full border p-4 mt-4  rounded-lg h-[84vh] xl:h-[82vh] ">
      <div className="absolute right-8 top-8">
        <select
          defaultValue={"DEFAULT"}
          onChange={(e) => {
            if (e.target.value === "checked") {
              setShowData(true)
            } else {
              setShowData(false)
            }
          }}
          className="bg-white outline-none flex items-center  text-gray-900 text-sm rounded-lg focus:ring-blue-500  w-full p-1.5 sm:p-2.5 "
        >
          <option value="checking">Đang sử lý</option>
          <option value="checked">Đã sử lý</option>
        </select>
      </div>
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
            {tableBody().map((license: License) => (
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
                  {license.idStore.address.street +
                    ", " +
                    license.idStore.address.ward +
                    ", " +
                    license.idStore.address.district +
                    ", Đà Nẵng"}
                </td>
                <td className="px-4 py-4 text-lg cursor-pointer capitalize">
                  {license.createdAt.slice(0, 10)}
                </td>
                <td className="px-4 py-4 text-lg cursor-pointer capitalize">
                  {license.status === "pending"
                    ? "Đợi sử lý"
                    : license.status === "checking"
                    ? "Đang kiểm tra"
                    : "Đã kiểm tra"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
