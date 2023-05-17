import React, { useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useMutation } from "react-query"
import { useRouter } from "next/router"

import {
  addInspectionResult,
  getInspectionPlanId,
  updateInspectionPlan,
} from "@/lib/helper"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

type Props = {
  data: any
}
type Result = {
  idUser: string
  idInspectionPlan: string
  idDocument: string
  content: string
  note: string
  img: string
}

const result = ({ data }: Props) => {
  const router = useRouter()
  const { data: session }: { data: any } = useSession()

  const [fileImage, setFileImage] = useState<File | any>(null)
  const [selectImage, setSelectImage] = useState("")
  const [formData, setFormData] = useState<Result | any>()

  function handleFileChange(event: any) {
    setSelectImage("")
    if (event.target.files[0])
      setSelectImage(URL.createObjectURL(event.target.files[0]))
    const file = event.target.files[0]
    setFileImage(file)
  }
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const updateMutation = useMutation(updateInspectionPlan, {
    onSuccess: () => {
      alert("Thành công")
      router.push("/atvstp/inspection")
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
    if (!fileImage) {
      console.log(fileImage)
    } else {
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
      const formDataI = new FormData()
      formDataI.append("file", fileImage)
      formDataI.append("upload_preset", "imageBusiness")

      const data = await fetch(
        "https://api.cloudinary.com/v1_1/dv5h57yvq/image/upload",
        {
          method: "POST",
          body: formDataI,
        }
      ).then((r) => r.json())

      model.img = data.secure_url
    }
    addMutation.mutate(model)
  }

  return (
    <div className="flex-1  bg-white text-gray-950">
      <div className="container mx-auto">
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
                <textarea
                  name="content"
                  onChange={handleChange}
                  className="block p-2.5 w-full text-xl text-gray-950 bg-transparent rounded-lg border border-gray-200 focus:outline-none scrollbar-style "
                  placeholder=""
                  required
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Kết quả
                </label>
              </div>

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
              <div className="relative border-2 border-gray-400 rounded-lg">
                <input
                  type="file"
                  placeholder="Image"
                  accept=".png, .jpg"
                  onChange={handleFileChange}
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-900 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Ảnh thuyết minh
                </label>
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
      <ToastContainer />
    </div>
  )
}

export async function getServerSideProps(context: any) {
  // Fetch data from external API
  const data = await getInspectionPlanId(context.query.inspectionPlan)

  // Pass data to the page via props
  return { props: { data } }
}

export default result
