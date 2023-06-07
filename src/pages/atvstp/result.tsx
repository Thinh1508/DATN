import React, { useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useMutation } from "react-query"
import { useRouter } from "next/router"

import {
  addInspectionResult,
  getDocument,
  getInspectionPlanId,
  updateCertificateReg,
  updateInspectionPlan,
  updateReport,
} from "@/lib/helper"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import SideBar from "@/layouts/SideBar"

type Props = {
  data: any
  documentData: any
}
type Result = {
  idUser: string
  idInspectionPlan: string
  idDocument: {
    _id: string
    title: string
  }
  content: string
  note: string
  img: string
}

const ResultPage = ({ data, documentData }: Props) => {
  const router = useRouter()
  const { data: session }: { data: any } = useSession()

  const [fileImage, setFileImage] = useState<File | any>(null)
  const [selectImage, setSelectImage] = useState<Array<String>>()
  const [formData, setFormData] = useState<Result | any>()

  function handleFileChange(event: any) {
    if (event.target.files) {
      const image = []
      for (const file of event.target.files) {
        image.push(URL.createObjectURL(file))
      }
      setSelectImage(image)
    }
    setFileImage(event.target.files)
  }
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const updateMutation = useMutation(updateInspectionPlan, {
    onSuccess: () => {
      toast.success("Thành công", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      // if (data.idReport) {
      //   updateRep.mutate({
      //     reportId: data.idReport._id,
      //     formData: { status: "checked" },
      //   })
      // } else {
      //   updateCer.mutate({
      //     storeId: data.idStore._id,
      //     formData: { status: "checked" },
      //   })
      // }
      setTimeout(() => {
        router.push("/atvstp/inspection")
      }, 2000)
    },
    onError: () => {
      console.log("error")
    },
  })

  const addMutation = useMutation(addInspectionResult, {
    onSuccess: () => {
      updateMutation.mutate({
        planId: data._id,
        formData: { status: "checked" },
      })
    },
    onError: (e: any) => {
      console.log(e)
    },
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const model = formData
    model.idInspectionPlan = data._id
    model.idUser = session?.user?._id
    model.img = await uploadFiles(fileImage)
    addMutation.mutate(model)
  }

  const uploadFiles = async (files: any) => {
    if (files) {
      toast("Đang thực hiện", {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      const CLOUD_NAME = "dv5h57yvq"
      const PRESET_NAME = "upload-result"
      const FOLDER_NAME = "imageResult"
      const url = []
      const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

      const formData = new FormData()

      formData.append("upload_preset", PRESET_NAME)
      formData.append("folder", FOLDER_NAME)

      for (const file of files) {
        formData.append("file", file)
        const response = await axios.post(api, formData, {
          headers: {
            "Content-Type": "multiple/form-data",
          },
        })
        url.push(response.data.secure_url)
      }
      return url
    }
  }

  return (
    <div className="bg-white flex-1">
      <div className="grid grid-cols-10 space-x-8 pt-4 container mx-auto scrollbar-style ">
        <div className="col-span-10 lg:col-span-7 mb-4 bg-white  shadow-xl h-fit text-gray-900">
          {data && (
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-10">
                <div className="relative border-2 border-gray-400 rounded-lg">
                  <input
                    type="text"
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
                    disabled
                    defaultValue={data.category}
                    className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-900 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
                    placeholder=" "
                  />
                  <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                    Loại thanh tra
                  </label>
                </div>

                <div className="relative border-2 border-gray-400 rounded-lg">
                  <select
                    name="content"
                    onChange={handleChange}
                    className="block px-2.5 py-2.5 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  >
                    <option className="relative" value="DEFAULT">
                      Kết quả
                    </option>
                    {data.idReport ? (
                      <>
                        <option className="relative" value="0">
                          Vi phạm và đã thu hồi giấy phép ATVSTP
                        </option>
                        <option className="relative" value="1">
                          Vi phạm và đã sử phạt
                        </option>
                        <option className="relative" value="2">
                          Không vi phạm
                        </option>
                      </>
                    ) : (
                      <>
                        <option className="relative" value="3">
                          Đủ điều kiện cấp giấy phép
                        </option>
                        <option className="relative" value="4">
                          Không đủ điều khiện cấp giấy phép
                        </option>
                      </>
                    )}
                  </select>
                </div>

                {data.idReport ? (
                  <div className="relative border-2 border-gray-400 rounded-lg">
                    <input
                      type="text"
                      name="note"
                      onChange={handleChange}
                      className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-900 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
                      placeholder=" "
                    />
                    <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                      Nội dung sử phạt
                    </label>
                  </div>
                ) : (
                  <div className="relative border-2 border-gray-400 rounded-lg">
                    <input
                      type="text"
                      name="note"
                      onChange={handleChange}
                      className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-900 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
                      placeholder=" "
                    />
                    <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                      Ghi chú
                    </label>
                  </div>
                )}
                <div className="relative border-2 border-gray-400 rounded-lg">
                  <select
                    name="idDocument"
                    onChange={handleChange}
                    className="block px-2.5 py-2.5 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  >
                    <option className="relative" value="DEFAULT">
                      Chọn văn bản
                    </option>
                    {documentData.map((category: any) => (
                      <option key={category._id} value={category._id}>
                        {category.symbol}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative border-2 border-gray-400 rounded-lg ">
                  <div className="">
                    <input
                      type="file"
                      placeholder="Image"
                      multiple
                      accept=".png, .jpg"
                      onChange={handleFileChange}
                      className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-900 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
                    />
                    <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                      Ảnh thuyết minh
                    </label>
                  </div>
                  <div className=" text-gray-900">
                    <div className="flex shrink-0 flex-wrap m-2">
                      {selectImage?.map((image: any) => (
                        <img
                          src={image}
                          alt=""
                          className="w-32 h-32"
                          key={image}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
                <button
                  type="submit"
                  className="sm:w-1/2 text-green-900 bg-white border border-green-900 hover:bg-green-800  hover:transition-all hover:duration-500 ease-in-out hover:text-white  font-medium rounded-lg text-lg px-5 py-2.5 text-center "
                >
                  Báo cáo
                </button>
                <Link
                  href={"/atvstp/inspection"}
                  className="sm:w-1/2 text-gray-950 bg-white border border-gray-900 hover:bg-gray-900 hover:transition-all hover:duration-500 ease-in-out hover:text-white  font-medium rounded-lg text-lg px-5 py-2.5 text-center "
                >
                  Đóng
                </Link>
              </div>
            </form>
          )}
        </div>
        <SideBar />
      </div>
      <ToastContainer />
    </div>
  )
}

export async function getServerSideProps(context: any) {
  // Fetch data from external API
  const data = await getInspectionPlanId(context.query.inspectionPlan)
  const documentData = await getDocument()
  // Pass data to the page via props
  return { props: { data, documentData } }
}

export default ResultPage
