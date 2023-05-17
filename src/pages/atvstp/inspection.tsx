import React, { useState } from "react"
import { useSession } from "next-auth/react"
import { useQuery } from "react-query"

import { getInspectionPlan } from "@/lib/helper"
import IModal from "./iModal"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

type Props = {}

const inspection = (props: Props) => {
  const { isLoading, isError, data, error } = useQuery(
    "inspectionPlan",
    getInspectionPlan
  )

  const { data: session }: { data: any } = useSession()

  const showInspection = () => {
    const addressI = session?.user?.address.ward
    const inspectionData = data
    return inspectionData.filter(
      (inspection: any) => inspection.idStore.address.ward === addressI
    )
  }

  const [modal, setModal] = useState(false)
  const [insInfo, setInsInfo] = useState(Object)

  const handleOnClose = (mess: string) => {
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
    <div className="bg-white flex-1">
      <div className="container mx-auto text-gray-900">
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
            </tr>
          </thead>
          <tbody>
            {showInspection().map((plan: any, index: any) => (
              <tr
                key={plan._id}
                onClick={() => {
                  setInsInfo(plan)
                  setModal(true)
                }}
              >
                <td className="px-4 py-4 text-lg cursor-pointer capitalize">
                  {index + 1}
                </td>
                <td className="px-4 py-4 text-lg cursor-pointer capitalize">
                  {plan.name}
                </td>
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
                  {plan.status === "pending" ? "Chờ sử lý" : "Đang thanh tra"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <IModal visible={modal} onClose={handleOnClose} insData={insInfo} />
      )}
      <ToastContainer />
    </div>
  )
}

export default inspection
