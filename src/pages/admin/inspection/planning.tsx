import React, { useState } from "react"
import { NextPageWithLayout } from "@/pages/_app"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { useMutation, useQuery, useQueryClient } from "react-query"

import AdminLayout from "@/layouts/AdminLayout"
import {
  addInspectionPlan,
  getCategory,
  updateReport,
  updateStore,
} from "@/lib/helper"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

type Props = {}
type Category = {
  _id: string
  title: string
  slug: string
  description: string
  createdAt: string
  updatedAt: string
}

const PlanningAdmin: NextPageWithLayout = (props: Props) => {
  const queryClient = useQueryClient()

  const { isLoading, isError, data, error } = useQuery("category", getCategory)
  const inspectionCategory = () => {
    const inspection = data
    return inspection.filter(
      (category: Category) => category.description === "inspection"
    )
  }

  const router = useRouter()
  const { store, idCertificateReg, type } = router.query
  const parsedStore = JSON.parse(store as string)

  const { data: session }: { data: any } = useSession()

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    startTime: "",
    actionTime: "",
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const updateMutation = useMutation(updateStore, {
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

  const addMutation = useMutation(addInspectionPlan, {
    onSuccess: () => {
      alert("Thêm thành công")
      if (type === "inspection") {
        updateMutation.mutate({
          storeId: idCertificateReg,
          formData: { status: "checking" },
        })
      } else {
        updateMutation1.mutate({
          reportId: idCertificateReg,
          formData: { status: "checking" },
        })
      }
      router.push("/admin/inspection")
    },
    onError: () => {
      toast.error("Thất bại", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    },
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (type === "inspection") {
      const model = {
        idUser: session?.user?._id,
        idStore: parsedStore._id,
        name: formData.name,
        category: formData.category,
        startTime: formData.startTime,
        actionTime: formData.actionTime,
      }
      addMutation.mutate(model)
    } else {
      const model = {
        idUser: session?.user?._id,
        idStore: parsedStore._id,
        idReport: idCertificateReg,
        name: formData.name,
        category: formData.category,
        startTime: formData.startTime,
        actionTime: formData.actionTime,
      }
      addMutation.mutate(model)
    }
    setFormData({
      name: "",
      category: "",
      startTime: "",
      actionTime: "",
    })
  }

  if (isLoading) return <div>Đang tải dữ liệu...</div>
  if (isError) return <div>Lỗi khi tải dữ liệu {`${error}`}</div>
  return (
    <div className="sm:p-8 p-4 bg-gray-300 h-screen w-full overflow-y-auto">
      <h1 className="p-4 sm:p-0 text-2xl font-semibold uppercase text-gray-700">
        Lên kế hoạch
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="bg-white w-full border p-4 mt-4  rounded-lg h-fit  ">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-[90%] sm:h-fit">
            <div className="h-fit">
              <div className="relative border-2 border-gray-400 rounded-lg mb-10">
                <input
                  type="text"
                  name="name"
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
                  defaultValue={"DEFAULT"}
                  onChange={handleChange}
                  className="block px-2.5 py-2.5 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer capitalize"
                >
                  <option className="relative" value="DEFAULT">
                    Loại thanh tra
                  </option>
                  {inspectionCategory().map((category: Category) => (
                    <option key={category._id} value={category.title}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative border-2 border-gray-400 rounded-lg mb-10">
                <input
                  type="text"
                  defaultValue={parsedStore.name}
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 capitalize"
                  placeholder=" "
                  disabled
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Tên cơ sở thanh tra
                </label>
              </div>
              <div className="relative border-2 border-gray-400 rounded-lg mb-10">
                <input
                  type="text"
                  defaultValue={parsedStore.type}
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 capitalize"
                  placeholder=" "
                  disabled
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Hình thức kinh doanh
                </label>
              </div>
              <div className="relative border-2 border-gray-400 rounded-lg mb-10">
                <input
                  type="text"
                  defaultValue={
                    parsedStore.address.street +
                    ", " +
                    parsedStore.address.ward +
                    ", " +
                    parsedStore.address.district +
                    ", Đà Nẵng"
                  }
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 capitalize"
                  placeholder=" "
                  disabled
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Địa chỉ
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative  rounded-lg">
                  <input
                    type="date"
                    name="startTime"
                    onChange={handleChange}
                    className="bg-gray-50 border-2 border-gray-400 text-gray-900 text-xl rounded-lg outline-none  block w-full p-2.5 "
                    placeholder=""
                    required
                  />
                  <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                    Ngày thực hiện
                  </label>
                </div>
                <div className="relative border-2 border-gray-400 rounded-lg mb-10">
                  <input
                    name="actionTime"
                    onChange={handleChange}
                    className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 capitalize"
                    placeholder=" "
                    required
                  />
                  <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                    Thời hạn(ngày)
                  </label>
                </div>
              </div>
            </div>
            <div className="relative border-2 border-gray-400 rounded-lg">
              <div className="sm:m-4 min-h-[5vh] text-gray-900">
                <h1 className=" p-2 sm:text-2xl text-xs font-medium sm:font-semibold uppercase ">
                  Bản sao giấy phép kinh doanh
                </h1>
                <div className="h-[43vh] overflow-y-auto scrollbar-style">
                  <img
                    src={parsedStore.imageBusiness}
                    alt="anh giay phep kinh doanh"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <button
              type="submit"
              className="sm:w-full text-green-900 bg-white border border-green-900 hover:bg-green-800  hover:transition-all hover:duration-500 ease-in-out hover:text-white  font-medium rounded-lg text-lg  py-2.5 mt-5 text-center"
            >
              Lên
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

PlanningAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default PlanningAdmin
