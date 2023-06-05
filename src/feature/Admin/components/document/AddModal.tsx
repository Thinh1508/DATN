import React, { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useSession } from "next-auth/react"
import { AiOutlineClose } from "react-icons/ai"

import { storage } from "../../../../../firebaseConfig"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { addDocument, getCategory, getDocument } from "@/lib/helper"

import { Viewer, Worker } from "@react-pdf-viewer/core"
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"
import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

type Props = { visible: boolean; onClose: (mess: string) => void }
type Category = {
  _id: string
  title: string
  slug: string
  description: string
}
type Document = {
  symbol: string
  category: string
  issuingAgency: string
  title: string
  content: string
  node: string
  idUser: string
  issued: string
  effective: string
}

const AddModal = (props: Props) => {
  const queryClient = useQueryClient()
  const { data: session }: { data: any } = useSession()
  const { isLoading, isError, data, error } = useQuery("category", getCategory)

  const agencyCategory = () => {
    const agency = data
    return agency.filter(
      (category: Category) => category.description === "agency"
    )
  }
  const documentCategory = () => {
    const document = data
    return document.filter(
      (category: Category) => category.description === "document"
    )
  }

  const [pdfFile, setPdfFile] = useState(null)
  const [viewFdf, setViewFdf] = useState(null)
  const [pdfUpload, setPdfUpload] = useState<File>()
  const [downloadURL, setDownloadURL] = useState<String>()
  const [formData, setFormData] = useState<Document | any>({})

  const handelFileChange = (e: any) => {
    setViewFdf(null)
    let selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.size < 10000000) {
      setPdfUpload(selectedFile)
      let reader = new FileReader()
      reader.readAsDataURL(selectedFile)
      reader.onload = (e: any) => {
        setPdfFile(e.target.result)
      }
    } else {
      console.log("please select")
    }
  }
  const handleShowFile = () => {
    if (pdfFile !== null) {
      setViewFdf(pdfFile)
    } else {
      setViewFdf(null)
    }
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const uploadPDF = async (file: File) => {
    const name = file?.name
    const storageRef = ref(storage, `pdfFile/${name}`)
    const uploadTask = await uploadBytesResumable(storageRef, file as File)
    let link
    await getDownloadURL(uploadTask.ref).then((url) => {
      link = url
    })

    return link
  }

  const addMutation = useMutation(addDocument, {
    onSuccess: () => {
      queryClient.prefetchQuery("document", getDocument)
      props.onClose("success")
    },
    onError: () => {
      props.onClose("error")
    },
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (pdfUpload) {
      toast("Đang thực hiện...", {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      const model = formData
      model.idUser = session?.user?._id
      model.node = await uploadPDF(pdfUpload)
      addMutation.mutate(model)
    }
  }
  const newPlugin = defaultLayoutPlugin()

  if (isLoading) return <div>Đang tải dữ liệu...</div>
  if (isError) return <div>Lỗi khi tải dữ liệu {`${error}`}</div>
  if (!props.visible) return null
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-20">
      <div className="relative w-full max-w-3xl max-h-full overflow-y-auto scrollbar-style">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 className="text-2xl font-semibold text-gray-900 ">
              Thêm mới văn bản
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
            <div className="p-6 space-y-5 ">
              <div className="relative border-2 border-gray-400 rounded-lg">
                <input
                  type="text"
                  name="symbol"
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 "
                  placeholder=" "
                  required
                  onChange={handleChange}
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Số hiệu
                </label>
              </div>
              <div className="relative border-2 border-gray-400 rounded-lg">
                <input
                  type="text"
                  name="title"
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 "
                  placeholder=" "
                  required
                  onChange={handleChange}
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Tiêu đề
                </label>
              </div>
              <div className="relative border-2 border-gray-400 rounded-lg">
                <textarea
                  name="content"
                  className="block p-2.5 w-full text-xl text-gray-950 bg-transparent rounded-lg border border-gray-200 focus:outline-none scrollbar-style"
                  placeholder=""
                  onChange={handleChange}
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Nội dung
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative border-2 border-gray-400 rounded-lg">
                  <select
                    name="issuingAgency"
                    onChange={handleChange}
                    defaultValue={"DEFAULT"}
                    className="block px-2.5 py-2.5 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  >
                    <option className="relative" value="DEFAULT">
                      Chọn cơ quan ban hành
                    </option>
                    {agencyCategory().map((category: Category) => (
                      <option key={category._id} value={category.title}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative border-2 border-gray-400 rounded-lg">
                  <select
                    name="category"
                    onChange={handleChange}
                    defaultValue={"DEFAULT"}
                    className="block px-2.5 py-2.5 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  >
                    <option className="relative" value="DEFAULT">
                      Chọn loại văn bản
                    </option>
                    {documentCategory().map((category: Category) => (
                      <option key={category._id} value={category.title}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative sm:max-w-sm">
                  <input
                    type="date"
                    name="issued"
                    onChange={handleChange}
                    className="bg-gray-50 border-2 border-gray-400 text-gray-900 text-xl rounded-lg outline-none  block w-full p-2.5 "
                    required
                  />
                  <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                    Ngày ban hành
                  </label>
                </div>
                <div className="relative sm:max-w-sm">
                  <input
                    type="date"
                    name="effective"
                    onChange={handleChange}
                    className="bg-gray-50 border-2 border-gray-400 text-gray-900 text-xl rounded-lg outline-none  block w-full p-2.5 "
                    required
                  />
                  <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                    Ngày áp dụng
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-row items-center gap-6 relative">
                  <input
                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 pr-6"
                    id="file_input"
                    type="file"
                    onChange={handelFileChange}
                    accept=".pdf"
                    required
                  />
                  <span
                    className="absolute text-gray-700 top-3 right-1 hover:bg-gray-300 hover:text-gray-900 p-1 hover:rounded-md cursor-pointer"
                    onClick={() => {
                      setPdfFile(null)
                      setViewFdf(null)
                    }}
                  >
                    <AiOutlineClose size={15} />
                  </span>
                </div>
                <div className="flex flex-row">
                  <span
                    className="text-red-700 cursor-pointer border-2 border-red-700 rounded-lg text-lg p-1 hover:text-white hover:bg-red-700 "
                    onClick={handleShowFile}
                  >
                    Hiển thị
                  </span>
                </div>
              </div>
              <div className={`${viewFdf === null && "hidden"} h-64`}>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                  {viewFdf && (
                    <>
                      <Viewer fileUrl={viewFdf} plugins={[newPlugin]} />
                    </>
                  )}
                  {!viewFdf && <>No File</>}
                </Worker>
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
      <ToastContainer />
    </div>
  )
}

export default AddModal
