import React, { useState } from "react"
import Link from "next/link"
import { useQueryClient, useMutation } from "react-query"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { BiEdit, BiTrashAlt } from "react-icons/bi"

import { deleteUser, getUser } from "@/lib/helper"
import { useQuery } from "react-query"
import Modal from "./Modal"

type Props = { status: string }
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

const Table = (props: Props) => {
  const { isLoading, isError, data, error } = useQuery("user", getUser)
  const queryClient = useQueryClient()

  //delete user
  const [modalDelete, setModalDelete] = useState(false)
  const [userIdDelete, setUserIdDelete] = useState(String)
  const onDelete = async (userId: string) => {
    await deleteUser(userId)
    await queryClient.prefetchQuery("user", getUser)
    toast.success("Xóa tài khoản thành công", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }
  // show and edit
  const [modal, setModal] = useState(false)
  const [action, setAction] = useState("")
  const [userInfo, setUserInfo] = useState(Object)

  const handleOnClose = (mess: String) => {
    setModal(false)
    if (mess !== "close") {
      switch (mess) {
        case "success":
          toast.success("Chỉnh sửa thông tin thành công!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          break
        case "error":
          toast.error("Chỉnh sửa thộng tin thất bại!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          break
        default:
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
          toast.success("Chỉnh sửa thông tin thành công!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
      }
    }
  }

  const tableBody = () => {
    const statusData = data
    if (props.status.length > 0) {
      return statusData.filter((user: User) => user.status === props.status)
    }
    return statusData
  }

  if (isLoading) return <div>Employee is Loading...</div>
  if (isError) return <div>Got Error {`${error}`}</div>
  return (
    <div className="bg-white w-full border p-4 mt-4  rounded-lg h-[84vh] xl:h-[82vh] overflow-y-auto scrollbar-style">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg scrollbar-style">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-300 uppercase bg-gray-900 sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-4 py-3 xl:text-lg">
                Họ tên
              </th>
              <th scope="col" className="px-4 py-3 xl:text-lg">
                Ngày sinh
              </th>
              <th scope="col" className="px-4 py-3 xl:text-lg">
                Giới tính
              </th>
              <th scope="col" className="px-4 py-3 xl:text-lg">
                Email
              </th>
              <th scope="col" className="px-4 py-3  xl:text-lg">
                Quyền
              </th>
              <th scope="col" className="px-4 py-3 xl:text-lg">
                Trạng thái
              </th>
              <th scope="col" className="px-4 py-3 xl:text-lg">
                Tùy chọn
              </th>
            </tr>
          </thead>
          <tbody>
            {tableBody().map((user: User) => (
              <tr
                key={user._id}
                className="bg-gray-200 border-b text-gray-900 hover:bg-gray-300"
              >
                <th
                  scope="row"
                  className="px-4 py-4 font-medium  whitespace-nowrap text-lg cursor-pointer"
                  onClick={() => {
                    setUserInfo(user)
                    setAction("view")
                    setModal(true)
                  }}
                >
                  {user.name}
                </th>
                <td
                  className="px-4 py-4 text-lg cursor-pointer"
                  onClick={() => {
                    setUserInfo(user)
                    setAction("view")
                    setModal(true)
                  }}
                >
                  {user.dob}
                </td>
                <td
                  className="px-4 py-4 text-lg cursor-pointer"
                  onClick={() => {
                    setUserInfo(user)
                    setAction("view")
                    setModal(true)
                  }}
                >
                  {user.gender === 1 ? "Male" : "Female"}
                </td>
                <td
                  className="px-4 py-4 text-lg cursor-pointer"
                  onClick={() => {
                    setUserInfo(user)
                    setAction("view")
                    setModal(true)
                  }}
                >
                  {user.email}
                </td>
                <td
                  className="px-4 py-4 text-lg cursor-pointer"
                  onClick={() => {
                    setUserInfo(user)
                    setAction("view")
                    setModal(true)
                  }}
                >
                  {user.permissions === "user"
                    ? "Người dùng"
                    : user.permissions === "inspection"
                    ? "Cán bộ"
                    : "Người quản lý"}
                </td>
                <td
                  className="px-4 py-4 text-lg"
                  onClick={() => {
                    setUserInfo(user)
                    setAction("view")
                    setModal(true)
                  }}
                >
                  <span
                    className={`${
                      user.status === "active" ? "bg-green-500" : "bg-red-500"
                    } text-white px-6 py-2.5 rounded-xl text-lg`}
                  >
                    {user.status === "active" ? "Active" : "Block"}
                  </span>
                </td>
                <td className="flex items-center px-4 py-4 space-x-3 relative">
                  <button
                    className="cursor"
                    onClick={() => {
                      setUserInfo(user)
                      setAction("edit")
                      setModal(true)
                    }}
                  >
                    <BiEdit size={25} color="rgb(34,197,94)" />
                  </button>
                  <button
                    className="cursor"
                    onClick={() => {
                      setUserIdDelete(user._id)
                      setModalDelete(true)
                    }}
                  >
                    <BiTrashAlt size={25} color="rgb(244,63,94)" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="mt-7 w-full h-fit flex flex-row sm:justify-end justify-center">
        <nav className="">
          <ul className="inline-flex -space-x-px">
            <li>
              <Link
                href={"/admin/account"}
                className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
              >
                Previous
              </Link>
            </li>
            <li>
              <Link
                href={"/admin/account"}
                className="px-3 py-2 text-gray-600 border border-gray-300 bg-gray-200 hover:bg-gray-300 hover:text-blue-700"
              >
                1
              </Link>
            </li>
            <li>
              <Link
                href={"/admin/account"}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                ...
              </Link>
            </li>
            <li>
              <Link
                href={"/admin/account"}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                10
              </Link>
            </li>
            <li>
              <Link
                href={"/admin/account"}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
              >
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </div> */}
      <div
        className={`${
          !modalDelete ? "hidden" : "block "
        } fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-20`}
      >
        <div
          className={`bg-white p-8 bottom-0 border-4 border-green-600  rounded-lg flex flex-col items-center transition ease-in-out delay-150 duration-1000`}
        >
          <span className="font-medium text-3xl text-gray-950">
            Bạn có muôn xóa tài khoản không?
          </span>
          <div className="mt-6 grid grid-cols-2 gap-10">
            <button
              onClick={() => {
                if (userIdDelete.length > 0) onDelete(userIdDelete)
                setModalDelete(false)
                setUserIdDelete("")
              }}
              className="bg-white border-2 border-red-600 text-red-600 px-6 py-0 rounded-lg hover:bg-red-600 hover:text-white"
            >
              <span className="text-xl font-medium capitalize ">Có</span>
            </button>
            <button
              onClick={() => setModalDelete(false)}
              className="bg-white border-2 border-gray-600 text-gray-600 px-6 py-0 rounded-lg hover:bg-gray-600 hover:text-white"
            >
              <span className="text-xl font-medium capitalize">Không</span>
            </button>
          </div>
        </div>
      </div>
      {modal && (
        <Modal
          action={action}
          visible={modal}
          onClose={handleOnClose}
          userData={userInfo}
        />
      )}
    </div>
  )
}

export default Table
