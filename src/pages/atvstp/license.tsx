import React, { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { getSession, useSession } from "next-auth/react"
import Link from "next/link"

import checkAuth from "../middleware/checkAuth"
import { addCertificateReg, getStoreUserId } from "@/lib/helper"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

type Props = {
  data: any
}
type Store = {
  _id: string
  idUser: string
  name: string
  imageBusiness: string
  type: string
  address: string
  status: string
}
type CertificateRegistration = {
  idStore: string
  proposal: string
  healthCertificate: string
  description: string
  trainCertificate: string
  status: string
}

const LicensePage = ({ data }: Props) => {
  const [fileImage1, setFileImage1] = useState<File | any>(null)
  const [fileImage2, setFileImage2] = useState<File | any>(null)
  const [fileImage4, setFileImage3] = useState<File | any>(null)
  const [fileImage3, setFileImage4] = useState<File | any>(null)
  const [formData, setFormData] = useState<CertificateRegistration | any>()

  function handleFileChange1(event: any) {
    const file = event.target.files[0]
    setFileImage1(file)
  }
  function handleFileChange2(event: any) {
    const file = event.target.files[0]
    setFileImage2(file)
  }
  function handleFileChange3(event: any) {
    const file = event.target.files[0]
    setFileImage3(file)
  }
  function handleFileChange4(event: any) {
    const file = event.target.files[0]
    setFileImage4(file)
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const uploadImage = async (image: File) => {
    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", "imageBusiness")

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dv5h57yvq/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json())
    return data.secure_url
  }

  const addMutation = useMutation(addCertificateReg, {
    onSuccess: () => {
      toast.success("Thành công", {
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

  const handleSubmit = async (e: any) => {
    e.preventDefault()
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
    const model = formData
    model.proposal = await uploadImage(fileImage1)
    model.description = await uploadImage(fileImage2)
    model.healthCertificate = await uploadImage(fileImage3)
    model.trainCertificate = await uploadImage(fileImage4)
    addMutation.mutate(model)
  }
  return (
    <div className="bg-white flex-1">
      <div className="container mx-auto text-gray-900">
        {data?.map ? (
          <form method="POST" onSubmit={handleSubmit}>
            <div className="p-6 space-y-10">
              <div className="relative border-2 border-gray-400 rounded-lg">
                <select
                  name="idStore"
                  onChange={handleChange}
                  className="block px-2.5 py-2.5 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                >
                  <option className="relative" value="DEFAULT">
                    Tên cơ sở kinh doanh
                  </option>
                  {data.map((store: Store) => (
                    <option key={store._id} value={store._id}>
                      {store.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative border-2 border-gray-400 rounded-lg">
                <input
                  type="file"
                  required
                  placeholder="Image"
                  accept=".png, .jpg"
                  onChange={handleFileChange1}
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-900 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
                />
                <label className="absolute -top-7 lg:-top-3 bg-white left-3">
                  Đơn đề nghị cấp Giấy chứng nhận
                </label>
              </div>
              <div className="relative border-2 border-gray-400 rounded-lg">
                <input
                  type="file"
                  required
                  placeholder="Image"
                  accept=".png, .jpg"
                  onChange={handleFileChange2}
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-900 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
                />
                <label className="absolute -top-7 lg:-top-3 bg-white left-3">
                  Bản thuyết minh về cơ sở vật chất, trang thiết bị
                </label>
              </div>
              <div className="relative border-2 border-gray-400 rounded-lg">
                <input
                  type="file"
                  required
                  placeholder="Image"
                  accept=".png, .jpg"
                  onChange={handleFileChange3}
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-900 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
                />
                <label className="absolute -top-7 lg:-top-3 bg-white left-3">
                  Giấy xác nhận tập huấn an toàn về sinh thực phẩm
                </label>
              </div>
              <div className="relative border-2 border-gray-400 rounded-lg">
                <input
                  type="file"
                  required
                  placeholder="Image"
                  accept=".png, .jpg"
                  onChange={handleFileChange4}
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-900 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
                />
                <label className="absolute -top-7 lg:-top-3 bg-white left-3">
                  Giấy xác nhận đủ sức khỏe của chủ cơ sở
                </label>
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
              <button
                type="submit"
                className="sm:w-1/2 text-green-900 bg-white border border-green-900 hover:bg-green-800  hover:transition-all hover:duration-500 ease-in-out hover:text-white  font-medium rounded-lg text-lg px-5 py-2.5 text-center "
              >
                Thêm
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-white">
            <h1 className="text-xl md:text-4xl font-bold text-gray-800 mt-20 ">
              Bạn chưa có cơ sở kinh doanh nào
            </h1>
            <Link
              href="/atvstp/store"
              className="mt-8 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Đăng kí ngay
            </Link>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const session: any = await getSession(context)
  let data = null
  if (session?.user?._id) {
    data = await getStoreUserId(session?.user?._id)
  }

  // Pass data to the page via props
  return { props: { data } }
}

export default LicensePage
