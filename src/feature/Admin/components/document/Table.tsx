import React, { useState } from "react"
import Link from "next/link"
import { useQuery, useQueryClient } from "react-query"
import { BiEdit, BiTrashAlt } from "react-icons/bi"

import Modal from "../document/Modal"
import { deleteDocument, getDocument } from "@/lib/helper"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Table = () => {
  const queryClient = useQueryClient()
  const { isLoading, isError, data, error } = useQuery("document", getDocument)
  const [modal, setModal] = useState(false)
  const [action, setAction] = useState("")
  const [documentInfo, setDocumentInfo] = useState(Object)

  const handleOnClose = (mess: string) => {
    setModal(false)
    if (mess !== "close") {
      switch (mess) {
        case "success":
          toast.success("Thành công!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          break
        case "error":
          toast.error("Thất bại!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          break
        default:
          toast.success("Thành công!", {
            position: "top-right",
            autoClose: 1000,
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

  //delete document
  const [modalDelete, setModalDelete] = useState(false)
  const [documentIdDelete, setDocumentIdDelete] = useState(String)
  const onDelete = async (documentId: string) => {
    await deleteDocument(documentId)
    queryClient.prefetchQuery("document", getDocument)
    toast.success("Xóa thành công", {
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

  if (isLoading) return <div>Đang tải dữ liệu...</div>
  if (isError) return <div>Lỗi khi tải dữ liệu {`${error}`}</div>
  return (
    <div className="bg-white w-full border p-4 mt-4  rounded-lg h-[84vh] xl:h-[82vh] overflow-y-auto scrollbar-style">
      <div className="mb-4">
        <button
          className="bg-white py-2 px-6 border-green-600 text-green-600 border-2 rounded-lg hover:bg-green-600 hover:text-white"
          onClick={() => {
            setAction("add")
            setModal(true)
          }}
        >
          <span className="font-medium">Thêm văn bản mới</span>
        </button>
      </div>
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-300 uppercase bg-gray-900">
          <tr>
            <th scope="col" className="px-4 py-3 xl:text-lg">
              Số hiệu
            </th>
            <th scope="col" className="px-4 py-3 xl:text-lg">
              Cơ quan ban hành
            </th>
            <th scope="col" className="px-4 py-3 xl:text-lg">
              Loại văn bản
            </th>
            <th scope="col" className="px-4 py-3 xl:text-lg">
              Ngày ban hành
            </th>
            <th scope="col" className="px-4 py-3  xl:text-lg">
              Ngày áp dụng
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
          {data &&
            data.map((document: any) => (
              <tr
                className="bg-gray-200 border-b text-gray-900 hover:bg-gray-300"
                key={document._id}
              >
                <th
                  scope="row"
                  className="px-4 py-4 font-medium  whitespace-nowrap text-lg cursor-pointer"
                  onClick={() => {
                    setDocumentInfo(document)
                    setAction("view")
                    setModal(true)
                  }}
                >
                  {document.symbol}
                </th>
                <td
                  className="px-4 py-4 text-lg cursor-pointer"
                  onClick={() => {
                    setDocumentInfo(document)
                    setAction("view")
                    setModal(true)
                  }}
                >
                  {document.issuingAgency}
                </td>
                <td
                  className="px-4 py-4 text-lg cursor-pointer"
                  onClick={() => {
                    setDocumentInfo(document)
                    setAction("view")
                    setModal(true)
                  }}
                >
                  {document.category}
                </td>
                <td
                  className="px-4 py-4 text-lg cursor-pointer"
                  onClick={() => {
                    setDocumentInfo(document)
                    setAction("view")
                    setModal(true)
                  }}
                >
                  {document.issued}
                </td>
                <td
                  className="px-4 py-4 text-lg cursor-pointer"
                  onClick={() => {
                    setDocumentInfo(document)
                    setAction("view")
                    setModal(true)
                  }}
                >
                  {document.effective}
                </td>
                <td
                  className="px-4 py-4 text-lg cursor-pointer"
                  onClick={() => {
                    setDocumentInfo(document)
                    setAction("view")
                    setModal(true)
                  }}
                >
                  {document.status === "active" ? "Còn hiệu Lực" : "Hết hiệu lực"}
                </td>
                <td className="flex items-center px-4 py-4 space-x-3 relative">
                  <button
                    className="cursor"
                    onClick={() => {
                      setDocumentInfo(document)
                      setAction("edit")
                      setModal(true)
                    }}
                  >
                    <BiEdit size={25} color="rgb(34,197,94)" />
                  </button>
                  <button
                    className="cursor"
                    onClick={() => {
                      setDocumentIdDelete(document._id)
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
      <div className="mt-7 w-full h-fit flex flex-row sm:justify-end justify-center">
        <nav className="">
          <ul className="inline-flex -space-x-px">
            <li>
              <Link
                href={"/admin/document"}
                className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
              >
                Trước
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
                Sau
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div
        className={`${
          !modalDelete ? "hidden" : "block "
        } fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-20`}
      >
        <div
          className={`bg-white p-8 bottom-0 border-4 border-green-600  rounded-lg flex flex-col items-center transition ease-in-out delay-150 duration-1000`}
        >
          <span className="font-medium text-3xl text-gray-950">
            Bạn có muôn xóa văn bản không?
          </span>
          <div className="mt-6 grid grid-cols-2 gap-10">
            <button
              onClick={() => {
                if (documentIdDelete.length > 0) onDelete(documentIdDelete)
                setModalDelete(false)
                setDocumentIdDelete("")
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
          onClose={handleOnClose}
          visible={modal}
          documentData={documentInfo}
        />
      )}
      <ToastContainer />
    </div>
  )
}

export default Table
