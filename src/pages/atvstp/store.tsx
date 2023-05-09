import React, { useState } from "react"

import checkAuth from "../middleware/checkAuth"
import { useMutation } from "react-query"
import { addStore } from "@/lib/helper"
import { useSession } from "next-auth/react"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

type Props = {}
type Store = {
  idUser: string
  name: string
  imageBusiness: string
  type: string
  address: string
}

const store = (props: Props) => {
  const { data: session }: { data: any } = useSession()
  const [fileImage, setFileImage] = useState<File | any>(null)
  const [formData, setFormData] = useState<Store | any>()

  function handleFileChange(event: any) {
    const file = event.target.files[0]
    setFileImage(file)
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const addMutation = useMutation(addStore, {
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
    onError: (e) => {
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
    if (!fileImage) {
      console.log(fileImage)
    } else {
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

      const model = formData
      model.imageBusiness = data.secure_url
      model.idUser = session?.user?._id
      addMutation.mutate(model)
    }
  }
  return (
    <div className="bg-white h-[63vh]">
      <div className="container mx-auto text-gray-900">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="p-6 space-y-10">
            <div className="relative border-2 border-gray-400 rounded-lg">
              <input
                type="text"
                name="name"
                onChange={handleChange}
                className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 capitalize"
                placeholder=" "
              />
              <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                Tên cơ sở kinh doanh
              </label>
            </div>

            <div className="relative border-2 border-gray-400 rounded-lg">
              <input
                type="text"
                name="type"
                onChange={handleChange}
                className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-900 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer capitalize"
                placeholder=" "
              />
              <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                Hình thức kinh doanh
              </label>
            </div>

            <div className="relative border-2 border-gray-400 rounded-lg">
              <input
                type="text"
                name="address"
                onChange={handleChange}
                className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-900 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer capitalize"
                placeholder=" "
              />
              <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                Địa chỉ
              </label>
            </div>
            <div className="relative border-2 border-gray-400 rounded-lg">
              <input
                type="file"
                required
                placeholder="Image"
                accept=".png, .jpg"
                onChange={handleFileChange}
                className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-900 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
              />
              <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                Bản sao giấy phép kinh doanh
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
      </div>
      <ToastContainer />
    </div>
  )
}

export const getServerSideProps = checkAuth(async () => {
  return {
    props: {},
  }
})

export default store
