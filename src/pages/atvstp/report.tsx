import React, { useState } from "react"

import checkAuth from "../middleware/checkAuth"
import { useMutation, useQuery } from "react-query"
import { addReport, getStore } from "@/lib/helper"
import { useSession } from "next-auth/react"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Link from "next/link"

type Props = {}
type Store = {
  _id: string
  idUser: string
  name: string
  imageBusiness: string
  type: string
  address: string
  status: string
}

const report = (props: Props) => {
  const { data: session }: { data: any } = useSession()

  const { isLoading, isError, data, error } = useQuery("Store", getStore)

  const [fileImage, setFileImage] = useState<File | any>(null)
  const [selectImage, setSelectImage] = useState("")
  const [formData, setFormData] = useState<Store | any>()

  function handleFileChange(event: any) {
    setSelectImage(URL.createObjectURL(event.target.files[0]))
    const file = event.target.files[0]
    setFileImage(file)
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const addMutation = useMutation(addReport, {
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
      model.imageReport = data.secure_url
      model.idUser = session?.user?._id
      addMutation.mutate(model)
    }
  }

  if (isLoading) return <div>Đang tải dữ liệu...</div>
  if (isError) return <div>Lỗi khi tải dữ liệu {`${error}`}</div>
  return (
    <div className="bg-white flex-1">
      <div className="container mx-auto text-gray-900">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-[90%] sm:h-fit">
            <div className="p-6 space-y-10 flex flex-col">
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
                <textarea
                  name="content"
                  onChange={handleChange}
                  className="block p-2.5 w-full text-xl text-gray-950 bg-transparent rounded-lg border border-gray-200 focus:outline-none scrollbar-style"
                  placeholder=""
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Nội dung báo cáo
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
                  Hình ảnh minh họa
                </label>
              </div>
              <div className="relative border-2 border-gray-400 rounded-lg ">
                <button
                  type="submit"
                  className="w-full text-green-900 bg-white  hover:bg-green-800  hover:transition-all hover:duration-500 ease-in-out hover:text-white  font-medium rounded-lg text-lg px-5 py-2.5 text-center "
                >
                  Báo cáo
                </button>
              </div>
            </div>
            <div className="relative border-2 border-gray-400 rounded-lg my-6">
              <div className="h-[55vh] overflow-y-auto scrollbar-style">
                {selectImage ? (
                  <img src={selectImage} alt="anh tai len" className="p-4 " />
                ) : (
                  <></>
                )}
              </div>
            </div>
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

export default report
