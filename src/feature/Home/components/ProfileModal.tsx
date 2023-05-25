import React, { useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { useMutation, useQuery } from "react-query"

import { getWard, updateUser } from "@/lib/helper"
import { useRouter } from "next/router"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useSession } from "next-auth/react"

type Props = {
  onClose: (mess: string) => void
  visible: boolean
  dataUser: any
}

const ProfileModal = (props: Props) => {
  const router = useRouter()

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

  const [valDistrict, setValDistrict] = useState(
    props.dataUser.address.district
  )

  const [isValName, setValName] = useState(true)
  const [isValEmail, setValEmail] = useState(true)
  const verifyEmail = (email: string) => {
    let regex = new RegExp(/[\w]+@[\w]+\.[\w]/)
    if (regex.test(email)) {
      return true
    }
    return false
  }

  const [formData, setFormData] = useState(props.dataUser)
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

  const [mess, setMess] = useState("")
  const updateMutation = useMutation(updateUser, {
    onSuccess: () => {
      toast.success("Chỉnh sửa thông tin thành công!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      setTimeout(() => {
        router.reload()
      }, 1100)
    },
    onError: () => {
      setMess("error")
      props.onClose(mess)
    },
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const model = formData
    updateMutation.mutate({ userId: props.dataUser._id, formData: model })
  }

  if (isLoading) return <div className="absolute">Đang tải dữ liệu...</div>
  if (isError)
    return <div className="absolute">Lỗi khi tải dữ liệu {`${error}`}</div>
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-20">
      <div className="relative w-full max-w-3xl max-h-full overflow-y-auto scrollbar-style">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 className="text-2xl font-semibold text-gray-900 ">
              Chỉnh sửa thông tin cá nhân
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
            <div className=" p-6 space-y-10">
              <div className="relative border-2 border-gray-400 rounded-lg">
                <input
                  type="text"
                  name="name"
                  onChange={(e) => {
                    handleChange(e)
                    e.target.value.length > 0
                      ? setValName(true)
                      : setValName(false)
                  }}
                  defaultValue={props.dataUser.name}
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 capitalize"
                  placeholder=" "
                  required
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Họ tên
                </label>
                <span
                  className={`absolute ${
                    isValName && "hidden"
                  } text-sm text-red-600 font-semibold left-0 -bottom-6`}
                >
                  Ô này không được bỏ trống
                </span>
              </div>
              <div className="relative border-2 border-gray-400 rounded-lg">
                <input
                  type="text"
                  name="email"
                  defaultValue={props.dataUser.email}
                  onChange={(e) => {
                    handleChange(e)
                    const isVal = verifyEmail(e.target.value)
                    isVal ? setValEmail(true) : setValEmail(false)
                  }}
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-900 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
                  placeholder=" "
                  required
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Email
                </label>
                <span
                  className={`absolute ${
                    isValEmail && "hidden"
                  } text-sm text-red-600 font-semibold left-0 -bottom-6`}
                >
                  Email không đúng
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative border-2 border-gray-400 rounded-lg">
                  <select
                    name="district"
                    onChange={(e) => {
                      handleDistrictChange(e)
                      setValDistrict(e.target.value)
                    }}
                    defaultValue={props.dataUser.address.district}
                    className="block px-2.5 py-2.5 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required
                  >
                    <option className="relative" value="DEFAULT">
                      Quận/Huyện
                    </option>
                    {showDistricts()}
                    <option value="đảo Hoàng Sa">đảo Hoàng Sa</option>
                  </select>
                  <BsChevronDown className="absolute right-3 top-[30%] text-gray-600" />
                </div>
                <div className="relative border-2 border-gray-400 rounded-lg">
                  <select
                    name="ward"
                    onChange={handleDistrictChange}
                    defaultValue={props.dataUser.address.ward}
                    className="block px-2.5 py-2.5 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required
                  >
                    <option className="relative" value="DEFAULT">
                      Phường/Xã
                    </option>
                    {showWard(valDistrict).map((ward: any) => (
                      <option value={ward.name} key={ward._id}>
                        {ward.name}
                      </option>
                    ))}
                  </select>
                  <BsChevronDown className="absolute right-3 top-[30%] text-gray-600" />
                </div>
              </div>

              <div className="relative border-2 border-gray-400 rounded-lg">
                <input
                  type="text"
                  name="address"
                  onChange={handleDistrictChange}
                  defaultValue={props.dataUser.address.street}
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-900 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
                  placeholder=" "
                  required
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Địa chỉ
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative sm:max-w-sm">
                  <input
                    type="date"
                    name="dob"
                    onChange={handleChange}
                    defaultValue={props.dataUser.dob}
                    className="bg-gray-50 border-2 border-gray-400 text-gray-900 text-xl rounded-lg outline-none  block w-full p-2.5 "
                    placeholder=""
                    required
                  />
                  <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                    Ngày sinh
                  </label>
                </div>
                <div className="relative border-2 border-gray-400 rounded-lg">
                  <select
                    name="gender"
                    onChange={handleChange}
                    defaultValue={props.dataUser.gender === 1 ? "Nam" : "Nữ"}
                    className="block px-2.5 py-2.5 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  >
                    <option value="1">Nam</option>
                    <option value="2">Nữ</option>
                  </select>
                  <BsChevronDown className="absolute right-3 top-[30%] text-gray-600" />
                </div>
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
      <ToastContainer />
    </div>
  )
}

export default ProfileModal
