import React, { useState } from "react"
import { useSession } from "next-auth/react"
import { useQuery } from "react-query"
import { BiEdit, BiTrashAlt } from "react-icons/bi"

import { getInspectionPlan } from "@/lib/helper"
import IModal from "./iModal"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ResultModal from "./ResultModal"
import SideBar from "@/layouts/SideBar"
import Link from "next/link"

type Props = {}

const InspectionAtvstp = (props: Props) => {
  const { isLoading, isError, data, error } = useQuery(
    "inspectionPlan",
    getInspectionPlan
  )

  const { data: session }: { data: any } = useSession()

  const showInspection = () => {
    const addressI = session?.user?.address?.ward
    let inspectionData = data
    if (Array.isArray(inspectionData)) {
      inspectionData = inspectionData.filter(
        (inspection: any) => inspection.idStore.address.ward === addressI
      )
    }
    return inspectionData
  }

  const [modal, setModal] = useState(false)
  const [modalResult, setModalResult] = useState(false)
  const [insInfo, setInsInfo] = useState(Object)

  const handleOnClose = (mess: string) => {
    setModal(false)
    setModalResult(false)
    if (mess !== "close") {
      switch (mess) {
        case "success":
          toast.success("Thành công!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          break
        case "error":
          toast.error("Thất bại!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          break
        default:
          toast("Đang thực hiện...", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          toast.success("Thành công!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
      }
    }
  }

  if (isLoading)
    return (
      <div className="flex-1 bg-white text-gray-950">Đang tải dữ liệu...</div>
    )
  if (isError)
    return (
      <div className="flex-1 bg-white text-gray-950">
        Lỗi khi tải dữ liệu {`${error}`}
      </div>
    )
  return (
    <div className="bg-white flex-1">
      <div className="container mx-auto text-gray-900 overflow-x-auto scrollbar-style">
        <table className="border w-full mt-4 ">
          <thead>
            <tr className="bg-slate-600 text-white">
              <td className="px-4 py-4 text-lg cursor-pointer uppercase">
                STT
              </td>
              <td className="px-4 py-4 text-lg cursor-pointer uppercase">
                tên kế hoạch
              </td>
              <td className="px-4 py-4 text-lg cursor-pointer uppercase">
                tên cơ sở
              </td>
              <td className="px-4 py-4 text-lg cursor-pointer uppercase">
                Loại thanh tra
              </td>
              <td className="px-4 py-4 text-lg cursor-pointer uppercase">
                Ngày thực hiện
              </td>
              <td className="px-4 py-4 text-lg cursor-pointer uppercase">
                Thời hạn
              </td>
              <td className="px-4 py-4 text-lg cursor-pointer uppercase">
                Trạng thái
              </td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(showInspection()) &&
              showInspection().map(
                (plan: any, index: any) =>
                  plan.status !== "end" && (
                    <tr key={plan._id}>
                      <td
                        onClick={() => {
                          setInsInfo(plan)
                          setModal(true)
                        }}
                        className="px-4 py-4 text-lg cursor-pointer capitalize"
                      >
                        {index + 1}
                      </td>
                      <td
                        onClick={() => {
                          setInsInfo(plan)
                          setModal(true)
                        }}
                        className="px-4 py-4 text-lg cursor-pointer capitalize"
                      >
                        {plan.name}
                      </td>
                      <td
                        onClick={() => {
                          setInsInfo(plan)
                          setModal(true)
                        }}
                        className="px-4 py-4 text-lg cursor-pointer capitalize"
                      >
                        {plan.idStore.name}
                      </td>
                      <td
                        onClick={() => {
                          setInsInfo(plan)
                          setModal(true)
                        }}
                        className="px-4 py-4 text-lg cursor-pointer capitalize"
                      >
                        {plan.category}
                      </td>
                      <td
                        onClick={() => {
                          setInsInfo(plan)
                          setModal(true)
                        }}
                        className="px-4 py-4 text-lg cursor-pointer capitalize"
                      >
                        {plan.startTime}
                      </td>
                      <td
                        onClick={() => {
                          setInsInfo(plan)
                          setModal(true)
                        }}
                        className="px-4 py-4 text-lg cursor-pointer capitalize"
                      >
                        {plan.actionTime}
                      </td>
                      <td
                        onClick={() => {
                          setInsInfo(plan)
                          setModal(true)
                        }}
                        className="px-4 py-4 text-lg cursor-pointer capitalize flex flex-row items-center justify-center"
                      >
                        {plan.status === "pending"
                          ? "Chờ xử lý"
                          : plan.status === "checking"
                          ? "Đang thanh tra"
                          : "Đã báo cáo"}
                      </td>
                      {plan.status === "checked" && (
                        <td
                          className="px-4 py-4 text-lg text-blue-500 cursor-pointer capitalize hover:text-red-700 hover:underline"
                          onClick={() => {
                            setInsInfo(plan)
                            setModalResult(true)
                          }}
                        >
                          {" "}
                          Xem kết quả
                        </td>
                      )}
                    </tr>
                  )
              )}
          </tbody>
        </table>
        <div className="mt-7 py-4 w-full h-fit flex flex-row sm:justify-end justify-center">
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
                  Sau
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* <SideBar /> */}
      </div>
      {modal && (
        <IModal visible={modal} onClose={handleOnClose} insData={insInfo} />
      )}
      {modalResult && (
        <ResultModal
          visible={modalResult}
          onClose={handleOnClose}
          insData={insInfo}
        />
      )}
      <ToastContainer />
    </div>
  )
}

export default InspectionAtvstp
