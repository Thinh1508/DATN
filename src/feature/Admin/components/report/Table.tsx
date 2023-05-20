import { getReport } from "@/lib/helper"
import React, { useState } from "react"
import { useQuery } from "react-query"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Modal from "./Modal"

type Props = {}
type Report = {
  _id: string
  idUser: {
    _id: string
    name: string
  }
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
  content: string
  imageReport: string
  status: string
  createdAt: string
}

const Table = (props: Props) => {
  const { isLoading, isError, data, error } = useQuery("report", getReport)

  const [reportData, setReportData] = useState(Object)
  const [showModal, setShowModal] = useState(false)
  const [showData, setShowData] = useState(false)

  const handleOnClose = () => {
    setShowModal(false)
  }

  const tableBody = () => {
    const reportData = data
    if (!showData) {
      return reportData.filter((report: any) => report.status !== "checked")
    }
    return reportData.filter((report: any) => report.status === "checked")
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
                Tên người báo cáo
              </th>
              <th scope="col" className="px-4 py-3 xl:text-lg cursor-pointer">
                Tên cơ sở
              </th>

              <th scope="col" className="px-4 py-3 xl:text-lg cursor-pointer">
                Nội dung
              </th>
              <th scope="col" className="px-4 py-3 xl:text-lg cursor-pointer">
                Địa chỉ
              </th>
              <th scope="col" className="px-4 py-3 xl:text-lg cursor-pointer">
                Ngày báo cáo
              </th>
              <th scope="col" className="px-4 py-3 xl:text-lg cursor-pointer">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody>
            {tableBody().map((report: Report) => (
              <tr
                className="bg-gray-200 border-b text-gray-900 hover:bg-gray-300"
                key={report._id}
                onClick={() => {
                  setReportData(report)
                  setShowModal(true)
                }}
              >
                <th
                  scope="row"
                  className="px-4 py-4 font-medium  whitespace-nowrap text-lg cursor-pointer capitalize"
                >
                  {report.idUser.name}
                </th>
                <td className="px-4 py-4 text-lg cursor-pointer capitalize">
                  {report.idStore.name}
                </td>
                <td className="px-4 py-4 text-lg cursor-pointer capitalize">
                  {report.content}
                </td>
                <td className="px-4 py-4 text-lg cursor-pointer capitalize">
                  {report.idStore.address.street +
                    ", " +
                    report.idStore.address.ward +
                    ", " +
                    report.idStore.address.district +
                    ", Đà Nẵng"}
                </td>
                <td className="px-4 py-4 text-lg cursor-pointer capitalize">
                  {report.createdAt.slice(0, 10)}
                </td>
                <td className="px-4 py-4 text-lg cursor-pointer capitalize">
                  {report.status === "pending"
                    ? "Đợi sử lý"
                    : report.status === "checking"
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
        <Modal
          onClose={handleOnClose}
          visible={showModal}
          reportData={reportData}
        />
      )}
    </div>
  )
}

export default Table
