import React, { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"

import {
  getCategory,
  getInspectionPlan,
  getInspectionResultId,
  updateInspectionPlan,
} from "@/lib/helper"
import Link from "next/link"

type Props = {
  onClose: (mess: string) => void
  visible: boolean
  action: string
  InsData: any
}
type Category = {
  _id: string
  title: string
  slug: string
  description: string
  createdAt: string
  updatedAt: string
}

const Modal = (props: Props) => {
  const { InsData: dataIns } = props
  const queryClient = useQueryClient()

  const insCategory = useQuery("category", getCategory)
  const insById = useQuery("inspectionResult", () =>
    getInspectionResultId(dataIns._id)
  )
  const inspectionCategory = () => {
    const inspection = insCategory.data
    return inspection.filter(
      (category: Category) => category.description === "inspection"
    )
  }

  const [formData, setFormData] = useState(dataIns)
  const [mess, setMess] = useState("")
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

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
    const model = formData
    console.log(model)
    updateMutation.mutate({ planId: dataIns._id, formData: model })
  }

  if (insCategory.isLoading || insById.isLoading)
    return (
      <div className="flex-1 bg-white text-gray-950">Đang tải dữ liệu...</div>
    )
  if (insCategory.isError || insById.isError)
    return (
      <div className="flex-1 bg-white text-gray-950">
        Lỗi khi tải dữ liệu! Tải lại trang
      </div>
    )

  switch (props.action) {
    case "view":
      return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-20">
          <div className="relative w-full max-w-3xl max-h-full">
            <div className="relative bg-white rounded-lg shadow ">
              <div className="flex items-start justify-between p-4 border-b rounded-t ">
                <h3 className="text-2xl font-semibold text-gray-900 ">
                  Kết quả thanh tra
                </h3>
                <button
                  type="button"
                  className="text-gray-400 text-sm bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center "
                  onClick={() => {
                    props.onClose("close")
                  }}
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
              <form>
                <div className="p-6 space-y-10 h-[55vh] overflow-y-auto scrollbar-style">
                  <div className="relative border-2 border-gray-400 rounded-lg">
                    <input
                      type="text"
                      name="name"
                      defaultValue={dataIns.name}
                      className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 "
                      placeholder=" "
                      disabled
                    />
                    <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                      Tên kế hoạch
                    </label>
                  </div>

                  <div className="relative border-2 border-gray-400 rounded-lg mb-10">
                    <input
                      type="text"
                      defaultValue={dataIns.category}
                      className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 "
                      placeholder=" "
                      disabled
                    />
                    <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                      Loại kế hoạch
                    </label>
                  </div>

                  <div className="relative border-2 border-gray-400 rounded-lg">
                    <input
                      type="text"
                      name="email"
                      disabled
                      defaultValue={dataIns.idStore.name}
                      className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-500 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
                      placeholder=" "
                    />
                    <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                      Tên cơ sở
                    </label>
                  </div>
                  <div className="relative border-2 border-gray-400 rounded-lg">
                    <input
                      type="text"
                      name="address"
                      disabled
                      defaultValue={
                        dataIns.idStore.address.street +
                        ", " +
                        dataIns.idStore.address.ward +
                        ", " +
                        dataIns.idStore.address.district +
                        ", Đà nẵng"
                      }
                      className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-500 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
                      placeholder=" "
                    />
                    <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                      Địa chỉ
                    </label>
                  </div>
                  <div className="relative border-2 border-gray-400 rounded-lg">
                    <textarea
                      name="content"
                      defaultValue={insById.data.content}
                      className="block p-2.5 w-full text-xl text-gray-950 bg-transparent rounded-lg border border-gray-200 focus:outline-none scrollbar-style "
                      placeholder=""
                      disabled
                    />
                    <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                      Kết quả
                    </label>
                  </div>

                  <div className="relative border-2 border-gray-400 rounded-lg">
                    <input
                      type="text"
                      name="note"
                      defaultValue={insById.data.note}
                      className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-900 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
                      placeholder=" "
                      disabled
                    />
                    <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                      Ghi chú
                    </label>
                  </div>
                  {insById.data.img && (
                    <div className="relative border-2 border-gray-400 rounded-lg p-4">
                      <Link href={insById.data.img} target="_blank">
                        <img src={insById.data.img} className="w-full h-fit" />
                      </Link>
                      <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                        Ảnh minh chứng báo cáo
                      </label>
                    </div>
                  )}
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
                  {dataIns.idReport ? (
                    <button
                      type="submit"
                      className="sm:w-1/2 text-yellow-700 bg-white border border-yellow-700 hover:bg-yellow-700 hover:transition-all hover:duration-500 ease-in-out hover:text-white  font-medium rounded-lg text-lg px-5 py-2.5 text-center "
                    >
                      Thu giấy phép ATVSTP
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="sm:w-1/2 text-green-900 bg-white border border-green-900 hover:bg-green-800  hover:transition-all hover:duration-500 ease-in-out hover:text-white  font-medium rounded-lg text-lg px-5 py-2.5 text-center "
                    >
                      Cấp giấy phép ATVSTP
                    </button>
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
    case "edit":
      return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-20">
          <div className="relative w-full max-w-3xl max-h-full">
            <div className="relative bg-white rounded-lg shadow ">
              <div className="flex items-start justify-between p-4 border-b rounded-t ">
                <h3 className="text-2xl font-semibold text-gray-900 ">
                  Chỉnh sửa kế hoạch
                </h3>
                <button
                  type="button"
                  className="text-gray-400 text-sm bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center "
                  onClick={() => {
                    props.onClose("close")
                  }}
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
                <div className="p-6 space-y-10">
                  <div className="relative border-2 border-gray-400 rounded-lg">
                    <input
                      type="text"
                      name="name"
                      defaultValue={dataIns.name}
                      onChange={handleChange}
                      className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 "
                      placeholder=" "
                      required
                    />
                    <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                      Tên kế hoạch
                    </label>
                  </div>

                  <div className="relative border-2 border-gray-400 rounded-lg mb-10">
                    <select
                      name="category"
                      defaultValue={dataIns.category}
                      onChange={handleChange}
                      className="block px-2.5 py-2.5 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer capitalize"
                    >
                      <option className="relative" value="DEFAULT">
                        Loại kế hoạch
                      </option>
                      {inspectionCategory().map((category: Category) => (
                        <option key={category._id} value={category.title}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative sm:max-w-sm">
                      <input
                        type="date"
                        name="startTime"
                        defaultValue={dataIns.startTime}
                        onChange={handleChange}
                        className="bg-gray-50 border-2 border-gray-400 text-gray-900 text-xl rounded-lg outline-none  block w-full p-2.5 "
                        placeholder="Select date"
                        required
                      />
                      <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                        Ngày thưc hiện
                      </label>
                    </div>
                    <div className="relative sm:max-w-sm">
                      <input
                        type="text"
                        name="actionTime"
                        defaultValue={dataIns.actionTime}
                        onChange={handleChange}
                        className="bg-gray-50 border-2 border-gray-400 text-gray-900 text-xl rounded-lg outline-none  block w-full p-2.5 "
                        placeholder="Select date"
                        required
                      />
                      <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                        Thời hạn(ngày)
                      </label>
                    </div>
                  </div>
                  <div className="relative border-2 border-gray-400 rounded-lg">
                    <input
                      type="text"
                      name="email"
                      disabled
                      defaultValue={dataIns.idStore.name}
                      className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-500 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
                      placeholder=" "
                    />
                    <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                      Tên cơ sở
                    </label>
                  </div>
                  <div className="relative border-2 border-gray-400 rounded-lg">
                    <input
                      type="text"
                      name="address"
                      disabled
                      defaultValue={
                        dataIns.idStore.address.street +
                        ", " +
                        dataIns.idStore.address.ward +
                        ", " +
                        dataIns.idStore.address.district +
                        ", Đà nẵng"
                      }
                      className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-500 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
                      placeholder=" "
                    />
                    <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                      Địa chỉ
                    </label>
                  </div>
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
                  <button
                    type="submit"
                    className="sm:w-1/2 text-yellow-700 bg-white border border-yellow-700 hover:bg-yellow-700 hover:transition-all hover:duration-500 ease-in-out hover:text-white  font-medium rounded-lg text-lg px-5 py-2.5 text-center "
                  >
                    Sửa
                  </button>
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
    default:
      return null
  }
}

export default Modal
