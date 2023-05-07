import React, { useState } from "react"
import Link from "next/link"

import { BiEdit, BiTrashAlt } from "react-icons/bi"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { useQuery, useQueryClient } from "react-query"
import { deleteCategory, getCategory } from "@/lib/helper"
import Modal from "./Modal"

type Props = {}
type Category = {
  _id: string
  title: string
  slug: string
  description: string
  createdAt: string
  updatedAt: string
}

const Table = (props: Props) => {
  const queryClient = useQueryClient()
  const { isLoading, isError, data, error } = useQuery("category", getCategory)
  const checkDescription = (description: string) => {
    if (description === "agency") return "Cơ quan ban hành"
    else if (description === "document") return "Loại văn bản"
    else return "Bài viết"
  }

  const [modal, setModal] = useState(false)
  const [action, setAction] = useState("")
  const [categoryInfo, setCategoryInfo] = useState(Object)
  const [modalDelete, setModalDelete] = useState(false)
  const [categoryIdDelete, setCategoryIdDelete] = useState(String)

  const onDelete = async (categoryId: string) => {
    await deleteCategory(categoryId)
    await queryClient.prefetchQuery("category", getCategory)
    toast.success("Xóa danh mục thành công", {
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

  const handleOnClose = (mess: String) => {
    setModal(false)
    if (mess !== "close") {
      switch (mess) {
        case "success":
          toast.success(
            `${action === "add" ? "Thêm" : "Sửa"} danh mục thành công!`,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          )
          break
        case "error":
          toast.error(
            `${action === "add" ? "Thêm" : "Sửa"} danh mục thành công!`,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          )
          break
        default:
          toast("Đang thực hiện!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          toast.success(
            `${action === "add" ? "Thêm" : "Sửa"} danh mục thành công!`,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          )
      }
    }
  }

  if (isLoading) return <div>Đang tải dữ liệu...</div>
  if (isError) return <div>Lỗi khi tải dữ liệu {`${error}`}</div>
  return (
    <div className="bg-white w-full border p-4 mt-4  rounded-lg h-[84vh] xl:h-[82vh] ">
      <div className="mb-4">
        <button
          className="bg-white py-2 px-6 border-green-600 text-green-600 border-2 rounded-lg hover:bg-green-600 hover:text-white"
          onClick={() => {
            setAction("add")
            setModal(true)
          }}
        >
          <span className="font-medium">Thêm mới danh mục</span>
        </button>
      </div>
      <div className="max-h-[91%] overflow-y-auto scrollbar-style">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-300 uppercase bg-gray-900 sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-4 py-3 xl:text-lg cursor-pointer">
                Tiêu đề
              </th>
              <th scope="col" className="px-4 py-3 xl:text-lg cursor-pointer">
                Đường dẫn
              </th>
              <th scope="col" className="px-4 py-3 xl:text-lg cursor-pointer">
                Loại danh mục
              </th>
              <th scope="col" className="px-4 py-3 xl:text-lg cursor-pointer">
                Ngày tạo
              </th>
              <th scope="col" className="px-4 py-3 xl:text-lg cursor-pointer">
                Ngày cập nhập
              </th>
              <th scope="col" className="px-4 py-3 xl:text-lg cursor-pointer">
                Tuỳ chọn
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((category: Category) => (
              <tr
                className="bg-gray-200 border-b text-gray-900 hover:bg-gray-300"
                key={category._id}
              >
                <th
                  scope="row"
                  className="px-4 py-4 font-medium  whitespace-nowrap text-lg cursor-pointer"
                  onClick={() => {
                    setCategoryInfo(category)
                    setAction("view")
                    setModal(true)
                  }}
                >
                  {category.title}
                </th>
                <td
                  className="px-4 py-4 text-lg cursor-pointer"
                  onClick={() => {
                    setCategoryInfo(category)
                    setAction("view")
                    setModal(true)
                  }}
                >
                  {category.slug}
                </td>
                <td
                  className="px-4 py-4 text-lg cursor-pointer"
                  onClick={() => {
                    setCategoryInfo(category)
                    setAction("view")
                    setModal(true)
                  }}
                >
                  {checkDescription(category.description)}
                </td>
                <td
                  className="px-4 py-4 text-lg cursor-pointer"
                  onClick={() => {
                    setCategoryInfo(category)
                    setAction("view")
                    setModal(true)
                  }}
                >
                  {category.createdAt}
                </td>
                <td
                  className="px-4 py-4 text-lg cursor-pointer"
                  onClick={() => {
                    setCategoryInfo(category)
                    setAction("view")
                    setModal(true)
                  }}
                >
                  {category.updatedAt}
                </td>
                <td className="flex items-center px-4 py-4 space-x-3 relative ">
                  <button
                    className="cursor"
                    onClick={() => {
                      setCategoryInfo(category)
                      setAction("edit")
                      setModal(true)
                    }}
                  >
                    <BiEdit size={25} color="rgb(34,197,94)" />
                  </button>
                  <button
                    className="cursor"
                    onClick={() => {
                      setCategoryIdDelete(category._id)
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
                href={"/admin/document"}
                className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
              >
                Previous
              </Link>
            </li>
            <li>
              <Link
                href={"/admin/document"}
                className="px-3 py-2 text-gray-600 border border-gray-300 bg-gray-200 hover:bg-gray-300 hover:text-blue-700"
              >
                1
              </Link>
            </li>
            <li>
              <Link
                href={"/admin/document"}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                ...
              </Link>
            </li>
            <li>
              <Link
                href={"/admin/document"}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                10
              </Link>
            </li>
            <li>
              <Link
                href={"/admin/document"}
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
            Bạn có thực sự muốn xoá danh mục?
          </span>
          <div className="mt-6 grid grid-cols-2 gap-10  ">
            <button
              onClick={() => {
                if (categoryIdDelete.length > 0) onDelete(categoryIdDelete)
                console.log(categoryIdDelete)
                setModalDelete(false)
                setCategoryIdDelete("")
              }}
              className="bg-white border-2 border-red-600 text-red-600 px-6 py-0 rounded-lg hover:bg-red-600 hover:text-white"
            >
              <span className="text-xl font-medium capitalize">Có</span>
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
      <ToastContainer />
      {modal && (
        <Modal
          action={action}
          onClose={handleOnClose}
          visible={modal}
          categoryData={categoryInfo}
        />
      )}
    </div>
  )
}

export default Table
