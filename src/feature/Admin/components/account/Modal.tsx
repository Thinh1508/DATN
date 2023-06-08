import React, { useState } from "react"

import { BsChevronDown } from "react-icons/bs"

import { addUser, getUser, getWard, updateUser } from "@/lib/helper"
import { useMutation, useQuery, useQueryClient } from "react-query"

type User = {
  _id: string
  name: string
  email: string
  address: string
  dob: string
  gender: number
  permissions: string
  status: string
}

type Props = {
  onClose: (mess: string) => void
  visible: boolean
  action: string
  userData: any
}

const Modal = (props: Props) => {
  const queryClient = useQueryClient()

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

  const { userData: dataUser } = props
  const [formData, setFormData] = useState(dataUser)

  //check value name and email
  const [isValEmail, setValEmail] = useState(true)
  const [isValName, setValName] = useState(true)
  const [isEmail, setEmail] = useState(dataUser.email)
  const [isName, setName] = useState(dataUser.name)
  const [isDistrict, setDistrict] = useState(false)
  const [valDistrict, setValDistrict] = useState("")
  const [valWar, setValWard] = useState("")
  const [valStreet, setValStreet] = useState("")

  const verifyEmail = (email: string) => {
    let regex = new RegExp(/[\w]+@[\w]+\.[\w]/)
    if (regex.test(email)) {
      setEmail(email)
      return true
    }
    return false
  }

  const [mess, setMess] = useState("")
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const addMutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.prefetchQuery("user", getUser)
      setMess("success")
      props.onClose(mess)
    },
    onError: () => {
      setMess("error")
    },
  })

  const updateMutation = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.prefetchQuery("user", getUser)
      props.onClose(mess)
      setMess("success")
    },
    onError: () => {
      setMess("error")
    },
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (isEmail.length > 0 && isName.length > 0) {
      const model = {
        name: formData.name,
        address: {
          district:
            valDistrict.length > 0 ? valDistrict : dataUser.address.district,
          ward: valWar.length > 0 ? valWar : formData.address.ward,
          street: valStreet.length > 0 ? valStreet : dataUser.address.street,
        },
        email: formData.email,
        gender: formData.gender,
        dob: formData.dob,
        permissions: formData.permissions,
      }
      if (!model.permissions) model.permissions == "user"
      if (props.action === "add") addMutation.mutate(model)
      if (props.action === "edit")
        updateMutation.mutate({ userId: dataUser._id, formData: model })
      setFormData(dataUser)
      setEmail("")
      setName("")
    }
  }

  if (isLoading) return <div className="absolute">Đang tải dữ liệu...</div>
  if (isError)
    return <div className="absolute">Lỗi khi tải dữ liệu {`${error}`}</div>

  switch (props.action) {
    case "view":
      return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-20">
          <div className="relative w-full max-w-3xl max-h-full">
            <div className="relative bg-white rounded-lg shadow ">
              <div className="flex items-start justify-between p-4 border-b rounded-t ">
                <h3 className="text-2xl font-semibold text-gray-900 ">
                  Tài khoản
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
              <form>
                <div className="p-6 space-y-10">
                  <div className="relative border-2 border-gray-400 rounded-lg">
                    <input
                      type="text"
                      name="name"
                      defaultValue={dataUser.name}
                      className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 "
                      placeholder=" "
                      disabled
                    />
                    <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                      Họ tên
                    </label>
                  </div>

                  <div className="relative border-2 border-gray-400 rounded-lg">
                    <input
                      type="text"
                      name="email"
                      disabled
                      defaultValue={dataUser.email}
                      className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-900 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
                      placeholder=" "
                    />
                    <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                      Email
                    </label>
                  </div>

                  <div className="relative border-2 border-gray-400 rounded-lg">
                    <input
                      type="text"
                      name="address"
                      disabled
                      defaultValue={
                        dataUser.address.street +
                        ", " +
                        dataUser.address.ward +
                        ", " +
                        dataUser.address.district +
                        ", Đà nẵng"
                      }
                      className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-900 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
                      placeholder=" "
                    />
                    <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                      Địa chỉ
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="relative sm:max-w-sm">
                      <input
                        type="date"
                        name="dob"
                        defaultValue={dataUser.dob}
                        disabled
                        className="bg-gray-50 border-2 border-gray-400 text-gray-900 text-xl rounded-lg outline-none  block w-full p-2.5 "
                        placeholder="Select date"
                      />
                      <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                        Ngày sinh
                      </label>
                    </div>
                    <div className="relative border-2 border-gray-400 rounded-lg">
                      <select
                        name="gender"
                        disabled
                        defaultValue={dataUser.gender}
                        className="block px-2.5 py-2.5 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      >
                        <option className="relative" value="DEFAULT">
                          Giới tính
                        </option>
                        <option value="1">Nam</option>
                        <option value="2">Nữ</option>
                      </select>
                    </div>
                    <div className="relative border-2 border-gray-400 rounded-lg">
                      <select
                        name="permissions"
                        disabled
                        defaultValue={dataUser.permissions}
                        className="block px-2.5 py-2.5 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      >
                        <option className="relative" value="DEFAULT">
                          Chọn quyền
                        </option>
                        <option value="user">Người dùng</option>
                        <option value="inspection">Cán bộ</option>
                        <option value="admin">Người quản lý</option>
                      </select>
                    </div>
                  </div>
                  <div className="relative flex flex-row items-center gap-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        value={"active"}
                        id="radioDefault1"
                        disabled
                        name="status"
                        defaultChecked={dataUser.status == "active"}
                        className="form-check-input appearance-none rounded-full h-5 w-5 border border-gray-300 checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      />
                      <label
                        htmlFor="radioDefault1"
                        className="inline-block text-gray-900 text-xl"
                      >
                        Bình thường
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        value={"block"}
                        id="radioDefault2"
                        name="status"
                        disabled
                        defaultChecked={dataUser.status !== "active"}
                        className="form-check-input appearance-none rounded-full h-5 w-5 border border-gray-300 checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      />
                      <label
                        htmlFor="radioDefault2"
                        className="inline-block text-gray-900 text-xl"
                      >
                        Khóa
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
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
    case "add":
      return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-20">
          <div className="relative w-full max-w-3xl max-h-full">
            <div className="relative bg-white rounded-lg shadow ">
              <div className="flex items-start justify-between p-4 border-b rounded-t ">
                <h3 className="text-2xl font-semibold text-gray-900 ">
                  Tạo mới tài khoản
                </h3>
                <button
                  type="button"
                  className="text-gray-400 text-sm bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center "
                  onClick={() => {
                    setEmail("")
                    setName("")
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
                      onChange={(e) => {
                        handleChange(e)
                        setName(e.target.value)
                        e.target.value.length > 0
                          ? setValName(true)
                          : setValName(false)
                      }}
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
                          setDistrict(true)
                          setValDistrict(e.target.value)
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
                      <BsChevronDown className="absolute right-3 top-[30%] text-gray-600" />
                    </div>
                    <div className="relative border-2 border-gray-400 rounded-lg">
                      <select
                        name="ward"
                        onChange={(e: any) => {
                          setValWard(e.target.value)
                        }}
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
                      <BsChevronDown className="absolute right-3 top-[30%] text-gray-600" />
                    </div>
                  </div>

                  {isDistrict && (
                    <div className="relative border-2 border-gray-400 rounded-lg">
                      <input
                        type="text"
                        name="address"
                        onChange={(e) => setValStreet(e.target.value)}
                        className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-900 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
                        placeholder=" "
                        required
                      />
                      <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                        Địa chỉ
                      </label>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="relative sm:max-w-sm">
                      <input
                        type="date"
                        name="dob"
                        onChange={handleChange}
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
                        defaultValue={"DEFAULT"}
                        className="block px-2.5 py-2.5 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      >
                        <option className="relative" value="DEFAULT">
                          Giới tính
                        </option>
                        <option value="1">Nam</option>
                        <option value="2">Nữ</option>
                      </select>
                      <BsChevronDown className="absolute right-3 top-[30%] text-gray-600" />
                    </div>
                    <div className="relative border-2 border-gray-400 rounded-lg">
                      <select
                        name="permissions"
                        onChange={handleChange}
                        defaultValue={"DEFAULT"}
                        className="block px-2.5 py-2.5 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      >
                        <option className="relative" value="DEFAULT">
                          Chọn quyền
                        </option>
                        <option value="user">Người dùng</option>
                        <option value="inspection">Cán bộ</option>
                      </select>
                      <BsChevronDown className="absolute right-3 top-[30%] text-gray-600" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
                  <button
                    type="submit"
                    className="sm:w-1/2 text-green-900 bg-white border border-green-900 hover:bg-green-800  hover:transition-all hover:duration-500 ease-in-out hover:text-white  font-medium rounded-lg text-lg px-5 py-2.5 text-center "
                  >
                    Thêm
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
    case "edit":
      return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-20">
          <div className="relative w-full max-w-3xl max-h-full">
            <div className="relative bg-white rounded-lg shadow ">
              <div className="flex items-start justify-between p-4 border-b rounded-t ">
                <h3 className="text-2xl font-semibold text-gray-900 ">
                  Chỉnh sửa tài khoản
                </h3>
                <button
                  type="button"
                  className="text-gray-400 text-sm bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center "
                  onClick={() => {
                    setEmail("")
                    setName("")
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
                      onChange={(e) => {
                        handleChange(e)
                        setName(e.target.value)
                        e.target.value.length > 0
                          ? setValName(true)
                          : setValName(false)
                      }}
                      defaultValue={dataUser.name}
                      className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 "
                      placeholder=" "
                    />
                    <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                      Họ tên
                    </label>
                    <span
                      className={`absolute ${
                        isValName && "hidden"
                      } text-sm text-red-600 font-semibold left-0 -bottom-6`}
                    >
                      Ô này không được để trống
                    </span>
                  </div>

                  <div className="relative border-2 border-gray-400 rounded-lg">
                    <input
                      type="text"
                      name="email"
                      onChange={(e) => {
                        handleChange(e)
                        const isVal = verifyEmail(e.target.value)
                        isVal ? setValEmail(true) : setValEmail(false)
                      }}
                      defaultValue={dataUser.email}
                      className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-900 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
                      placeholder=" "
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
                          setDistrict(true)
                          setValDistrict(e.target.value)
                        }}
                        defaultValue={dataUser.address.district}
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
                        onChange={(e: any) => {
                          setValWard(e.target.value)
                        }}
                        defaultValue={dataUser.address.ward}
                        className="block px-2.5 py-2.5 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        required
                      >
                        <option className="relative" value="DEFAULT">
                          Phường/Xã
                        </option>
                        {showWard(
                          valDistrict.length <= 0
                            ? dataUser.address.district
                            : valDistrict
                        ).map((ward: any) => (
                          <option value={ward.name}>{ward.name}</option>
                        ))}
                      </select>
                      <BsChevronDown className="absolute right-3 top-[30%] text-gray-600" />
                    </div>
                  </div>

                  <div className="relative border-2 border-gray-400 rounded-lg">
                    <input
                      type="text"
                      name="address"
                      onChange={(e) => setValStreet(e.target.value)}
                      defaultValue={dataUser.address.street}
                      className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-900 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer "
                      placeholder=" "
                      required
                    />
                    <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                      Địa chỉ
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="relative sm:max-w-sm">
                      <input
                        type="date"
                        name="dob"
                        defaultValue={dataUser.dob}
                        onChange={handleChange}
                        className="bg-gray-50 border-2 border-gray-400 text-gray-900 text-xl rounded-lg outline-none  block w-full p-2.5 "
                        placeholder="Select date"
                      />
                      <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                        Ngày sinh
                      </label>
                    </div>
                    <div className="relative border-2 border-gray-400 rounded-lg">
                      <select
                        name="gender"
                        onChange={handleChange}
                        defaultValue={dataUser.gender}
                        className="block px-2.5 py-2.5 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      >
                        <option className="relative" value="DEFAULT">
                          Giới tính
                        </option>
                        <option value="1">Nam</option>
                        <option value="2">Nữ</option>
                      </select>
                      <BsChevronDown className="absolute right-3 top-[30%] text-gray-600" />
                    </div>
                    <div className="relative border-2 border-gray-400 rounded-lg">
                      <select
                        name="permissions"
                        onChange={handleChange}
                        defaultValue={dataUser.permissions}
                        className="block px-2.5 py-2.5 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      >
                        <option value="user">Người dùng</option>
                        <option value="inspection">Cán bộ</option>
                        <option value="admin">Người quản lý</option>
                      </select>
                      <BsChevronDown className="absolute right-3 top-[30%] text-gray-600" />
                    </div>
                  </div>
                  <div className="relative flex flex-row items-center gap-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        value={"active"}
                        id="radioDefault1"
                        onChange={handleChange}
                        name="status"
                        defaultChecked={dataUser.status == "active"}
                        className="form-check-input appearance-none rounded-full h-5 w-5 border border-gray-300 checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      />
                      <label
                        htmlFor="radioDefault1"
                        className="inline-block text-gray-900 text-xl"
                      >
                        Bình thường
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        value={"block"}
                        id="radioDefault2"
                        name="status"
                        onChange={handleChange}
                        defaultChecked={dataUser.status !== "active"}
                        className="form-check-input appearance-none rounded-full h-5 w-5 border border-gray-300 checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      />
                      <label
                        htmlFor="radioDefault2"
                        className="inline-block text-gray-900 text-xl"
                      >
                        Khóa
                      </label>
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
        </div>
      )
    default:
      return null
  }
}

export default Modal
