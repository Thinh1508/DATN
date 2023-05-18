import React, { useState } from "react"

import checkAuth from "../middleware/checkAuth"
import { useMutation, useQuery } from "react-query"
import { addStore, getWard } from "@/lib/helper"
import { useSession } from "next-auth/react"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

type Props = {}
type Store = {
  idUser: string
  name: string
  imageBusiness: string
  type: string
  address: {
    district: string
    ward: string
    street: string
  }
}

const store = (props: Props) => {
  const { isLoading, isError, data, error } = useQuery("ward", getWard)
  const showDistricts = () => {
    const districts: Array<string> = []
    data.map((ward: any) => {
      if (districts.length === 0) {
        districts.push(ward.idDistrict.name)
      } else {
        if (ward.idDistrict.name !== districts[districts.length - 1]) {
          districts.push(ward.idDistrict.name)
        }
      }
    })
    const dataDistrict = districts.map((district) => (
      <option value={district} key={district}>
        {district}
      </option>
    ))
    return dataDistrict
  }
  const showWard = (district: string) => {
    const wards = data
    return wards.filter((ward: any) => ward.idDistrict.name === district)
  }

  const { data: session }: { data: any } = useSession()
  const [fileImage, setFileImage] = useState<File | any>(null)
  const [selectImage, setSelectImage] = useState("")
  const [formData, setFormData] = useState<Store | any>()
  const [isDistrict, setDistrict] = useState(false)
  const [valDistrict, setValDistrict] = useState("")

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

  const handleDistrictChange = (e: any) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      address: { ...formData.address, [name]: value },
    })
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
      model.imageBusiness = data.secure_url
      model.idUser = session?.user?._id
      addMutation.mutate(model)
    }
  }

  if (isLoading)
    return (
      <div className="flex-1 bg-white text-gray-950">Đang tải dữ liệu...</div>
    )
  if (isError)
    return (
      <div className="flex-1 bg-white text-gray-950">
        Lỗi khi tải dữ liệu {`${error}`}
      </div>
    )

  return (
    <div className="bg-white flex-1">
      <div className="container mx-auto text-gray-900">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-[90%] sm:h-fit">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative border-2 border-gray-400 rounded-lg">
                  <select
                    name="district"
                    onChange={(e) => {
                      setDistrict(true)
                      setValDistrict(e.target.value)
                      handleDistrictChange(e)
                    }}
                    defaultValue={"DEFAULT"}
                    className="block px-2.5 py-2.5 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required
                  >
                    <option className="relative" value="DEFAULT">
                      Quận/Huyện
                    </option>
                    {showDistricts()}
                    <option value="đảo Hoàng Sa">đảo Hoàng Sa</option>
                  </select>
                </div>
                <div className="relative border-2 border-gray-400 rounded-lg">
                  <select
                    name="ward"
                    onChange={handleDistrictChange}
                    className="block px-2.5 py-2.5 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required
                  >
                    <option className="relative" value="DEFAULT">
                      Phường/Xã
                    </option>
                    {showWard(valDistrict).map((ward: any) => (
                      <option value={ward.name}>{ward.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {isDistrict && (
                <div className="relative border-2 border-gray-400 rounded-lg">
                  <input
                    type="text"
                    name="street"
                    onChange={handleDistrictChange}
                    className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-900 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
                    placeholder=" "
                    required
                  />
                  <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                    Địa chỉ
                  </label>
                </div>
              )}
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
              <div className="relative border-2 border-gray-400 rounded-lg">
                <button
                  type="submit"
                  className="w-full text-green-900 bg-white  hover:bg-green-800  hover:transition-all hover:duration-500 ease-in-out hover:text-white  font-medium rounded-lg text-lg px-5 py-2.5 text-center "
                >
                  Thêm
                </button>
              </div>
            </div>
            <div className="relative border-2 border-gray-400 rounded-lg my-6">
              <div className="h-[55vh] overflow-y-auto scrollbar-style">
                {selectImage ? (
                  <img src={selectImage} alt="anh tai len" className="p-4" />
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

export default store
