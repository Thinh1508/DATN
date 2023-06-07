import React, { useState } from "react"
import { BiEdit, BiTrashAlt } from "react-icons/bi"
import { useMutation, useQuery, useQueryClient } from "react-query"

import {
  deleteInspectionPlan,
  getInspectionPlan,
  updateCertificateReg,
  updateReport,
} from "@/lib/helper"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Modal from "./Modal"

type Props = {}
type InspectionPlan = {
  _id: string
  name: string
  category: string
  startTime: string
  actionTime: string
  status: string
}

const Table = (props: Props) => {
  const { isLoading, isError, data, error } = useQuery(
    "inspectionPlan",
    getInspectionPlan
  )
  const queryClient = useQueryClient()

  //delete InspectionPlan
  const [modalDelete, setModalDelete] = useState(false)
  const [planIdDelete, setPlanIdDelete] = useState(String)
  const [updateId, setUpdateId] = useState("")
  const [type, setType] = useState("")

  const updateMutation = useMutation(updateCertificateReg, {
    onSuccess: () => {
      console.log("success")
    },
    onError: () => {
      console.log("error")
    },
  })

  const updateMutation1 = useMutation(updateReport, {
    onSuccess: () => {
      console.log("success")
    },
    onError: () => {
      console.log("error")
    },
  })
  const onDelete = async (planId: string) => {
    await deleteInspectionPlan(planId)

    await queryClient.prefetchQuery("inspectionPlan", getInspectionPlan)
    toast.success("Xóa kế hoạch thành công", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
    if (type === "report") {
      updateMutation1.mutate({
        reportId: updateId,
        formData: { status: "pending" },
      })
    } else {
      updateMutation.mutate({
        storeId: updateId,
        formData: { status: "pending" },
      })
    }
  }

  const [modal, setModal] = useState(false)
  const [action, setAction] = useState("")
  const [insInfo, setInsInfo] = useState(Object)

  const handleOnClose = (mess: String) => {
    setModal(false)
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

  if (isLoading) return <div>Đang tải dữ liệu...</div>
  if (isError) return <div>Lỗi khi tải dữ liệu {`${error}`}</div>
  return (
    <div className="bg-white w-full border p-4 mt-4  rounded-lg h-[84vh] xl:h-[82vh] ">
      <div className="max-h-[91%] overflow-y-auto scrollbar-style">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-300 uppercase bg-gray-900 sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-4 py-3 xl:text-lg cursor-pointer">
                Tên kế hoạch
              </th>
              <th scope="col" className="px-4 py-3 xl:text-lg cursor-pointer">
                tên cơ sở
              </th>
              <th scope="col" className="px-4 py-3 xl:text-lg cursor-pointer">
                Loại kết hoạch
              </th>
              <th scope="col" className="px-4 py-3 xl:text-lg cursor-pointer">
                Ngày bắt đầu
              </th>
              <th scope="col" className="px-4 py-3 xl:text-lg cursor-pointer">
                Thời hạn
              </th>
              <th scope="col" className="px-4 py-3 xl:text-lg cursor-pointer">
                Trạng thái
              </th>
              <th scope="col" className="px-4 py-3 xl:text-lg cursor-pointer">
                Tùy chọn
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              (plan: any) =>
                plan.status !== "end" && (
                  <tr
                    className="bg-gray-200 border-b text-gray-900 hover:bg-gray-300"
                    key={plan._id}
                  >
                    <th
                      scope="row"
                      className="px-4 py-4 font-medium  whitespace-nowrap text-lg cursor-pointer capitalize"
                    >
                      {plan.name}
                    </th>
                    <td className="px-4 py-4 text-lg cursor-pointer capitalize">
                      {plan.idStore.name}
                    </td>
                    <td className="px-4 py-4 text-lg cursor-pointer capitalize">
                      {plan.category}
                    </td>
                    <td className="px-4 py-4 text-lg cursor-pointer capitalize">
                      {plan.startTime}
                    </td>
                    <td className="px-4 py-4 text-lg cursor-pointer capitalize">
                      {plan.actionTime}
                    </td>
                    <td className="px-4 py-4 text-lg cursor-pointer capitalize">
                      {plan.status === "pending"
                        ? "Chờ xử lý"
                        : plan.status === "checking"
                        ? "Đang thanh tra"
                        : "Đã báo cáo"}
                    </td>
                    {plan.status === "pending" && (
                      <td className="flex items-center px-4 py-4 space-x-3 relative">
                        <button
                          className="cursor"
                          onClick={() => {
                            setInsInfo(plan)
                            setAction("edit")
                            setModal(true)
                          }}
                        >
                          <BiEdit size={25} color="rgb(34,197,94)" />
                        </button>
                        <button
                          className="cursor"
                          onClick={() => {
                            setPlanIdDelete(plan._id)
                            if (plan.idReport) {
                              setType("report")
                              setUpdateId(plan.idReport._id)
                            } else {
                              setType("inspection")
                              setUpdateId(plan.idStore._id)
                            }
                            setModalDelete(true)
                          }}
                        >
                          <BiTrashAlt size={25} color="rgb(244,63,94)" />
                        </button>
                      </td>
                    )}
                    {plan.status === "checked" ? (
                      <td
                        className="px-4 py-4 text-lg cursor-pointer capitalize hover:text-red-700 hover:underline"
                        onClick={() => {
                          setInsInfo(plan)
                          setAction("view")
                          setModal(true)
                        }}
                      >
                        Xem kết quả
                      </td>
                    ) : (
                      <td></td>
                    )}
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
      <div
        className={`${
          !modalDelete ? "hidden" : "block "
        } fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-20`}
      >
        <div
          className={`bg-white p-8 bottom-0 border-4 border-green-600  rounded-lg flex flex-col items-center transition ease-in-out delay-150 duration-1000`}
        >
          <span className="font-medium text-3xl text-gray-950">
            Bạn có muôn xóa kế hoạch không?
          </span>
          <div className="mt-6 grid grid-cols-2 gap-10">
            <button
              onClick={() => {
                onDelete(planIdDelete)
                setModalDelete(false)
                setPlanIdDelete("")
              }}
              className="bg-white border-2 border-red-600 text-red-600 px-6 py-0 rounded-lg hover:bg-red-600 hover:text-white"
            >
              <span className="text-xl font-medium capitalize ">Có</span>
            </button>
            <button
              onClick={() => setModalDelete(false)}
              className="bg-white border-2 border-gray-600 text-gray-600 px-6 py-0 rounded-lg hover:bg-gray-600 hover:text-white"
            >
              <span className="text-xl font-medium capitalize">Không</span>
            </button>
          </div>
        </div>
      </div>
      {modal && (
        <Modal
          action={action}
          visible={modal}
          onClose={handleOnClose}
          InsData={insInfo}
        />
      )}
      <ToastContainer />
    </div>
  )
}

export default Table
