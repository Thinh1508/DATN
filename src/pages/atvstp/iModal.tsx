import React, { useState } from "react"
import { useMutation, useQueryClient } from "react-query"

import { getInspectionPlan, updateInspectionPlan } from "@/lib/helper"
import Link from "next/link"

type Props = {
  onClose: (mess: string) => void
  visible: boolean
  insData: any
}

const IModal = (props: Props) => {
  const queryClient = useQueryClient()
  const { insData: data } = props

  const [mess, setMess] = useState("")

  const updateMutation = useMutation(updateInspectionPlan, {
    onSuccess: () => {
      queryClient.prefetchQuery("inspectionPlan", getInspectionPlan)
      setMess("success")
      props.onClose(mess)
    },
    onError: () => {
      setMess("error")
      props.onClose(mess)
    },
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (data.status === "pending") {
      const model = {
        status: "checking",
      }
      updateMutation.mutate({ planId: data._id, formData: model })
    }
  }
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[1000]">
      <div className="relative w-full max-w-3xl max-h-full">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 className="text-2xl font-semibold text-gray-900 ">
              Chi tiết kế hoạch thanh tra
            </h3>
            <button
              type="button"
              className="text-gray-400 text-sm bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center "
              onClick={() => props.onClose("close")}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-10 ">
              <div className="relative border-2 border-gray-400 rounded-lg">
                <input
                  type="text"
                  name="name"
                  defaultValue={data.name}
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 "
                  placeholder=" "
                  disabled
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Tên kế hoạch
                </label>
              </div>

              <div className="relative border-2 border-gray-400 rounded-lg">
                <input
                  type="text"
                  name="email"
                  disabled
                  defaultValue={data.idStore.name}
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-900 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
                  placeholder=" "
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Tên cơ sở
                </label>
              </div>

              <div className="relative border-2 border-gray-400 rounded-lg">
                <input
                  type="text"
                  name="email"
                  disabled
                  defaultValue={data.category}
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-900 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
                  placeholder=" "
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Loại thanh tra
                </label>
              </div>
              {/* {data.idReport && (
                <div className="relative border-2 border-gray-400 rounded-lg h-[20vh] overflow-y-auto scrollbar-style">
                  <img
                    src={data.idReport.imageReport}
                    alt="anh minh hoa"
                    className="m-4 h-fit"
                  />
                  <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                    Ảnh minh hoạ
                  </label>
                </div>
              )} */}

              <div className="relative border-2 border-gray-400 rounded-lg">
                <input
                  type="text"
                  name="address"
                  disabled
                  defaultValue={
                    data.idStore.address.street +
                    ", " +
                    data.idStore.address.ward +
                    ", " +
                    data.idStore.address.district +
                    ", Đà nẵng"
                  }
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-900 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
                  placeholder=" "
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Địa chỉ
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative sm:max-w-sm">
                  <input
                    type="text"
                    name="dob"
                    defaultValue={data.startTime}
                    disabled
                    className="bg-gray-50 border-2 border-gray-400 text-gray-900 text-xl rounded-lg outline-none  block w-full p-2.5 "
                    placeholder="Select date"
                  />
                  <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                    Ngày thưc hiện
                  </label>
                </div>
                <div className="relative sm:max-w-sm">
                  <input
                    type="text"
                    name="dob"
                    defaultValue={data.actionTime}
                    disabled
                    className="bg-gray-50 border-2 border-gray-400 text-gray-900 text-xl rounded-lg outline-none  block w-full p-2.5 "
                    placeholder="Select date"
                  />
                  <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                    Thời hạn(ngày)
                  </label>
                </div>
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
              {data.status === "pending" && (
                <button
                  type="submit"
                  className="sm:w-1/2 text-green-900 bg-white border border-green-900 hover:bg-green-800  hover:transition-all hover:duration-500 ease-in-out hover:text-white  font-medium rounded-lg text-lg px-5 py-2.5 text-center "
                >
                  Thực hiện thanh tra
                </button>
              )}

              {data.status === "checking" && (
                <Link
                  href={{
                    pathname: "/atvstp/result",
                    query: {
                      inspectionPlan: data._id,
                    },
                  }}
                  className="sm:w-1/2 text-green-900 bg-white border border-green-900 hover:bg-green-800  hover:transition-all hover:duration-500 ease-in-out hover:text-white  font-medium rounded-lg text-lg px-5 py-2.5 text-center "
                >
                  Báo cáo kết quả
                </Link>
              )}
              <button
                onClick={() => props.onClose("close")}
                className="sm:w-1/2 text-gray-950 bg-white border border-gray-900 hover:bg-gray-900 hover:transition-all hover:duration-500 ease-in-out hover:text-white  font-medium rounded-lg text-lg px-5 py-2.5 text-center "
              >
                Đóng
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default IModal
