import React, { useState, useMemo } from "react"

import { useQueryClient, useMutation, useQuery } from "react-query"
import { addPost, getCategory, getPost } from "@/lib/helper"
import dynamic from "next/dynamic"
import "react-quill/dist/quill.snow.css"

type Props = { visible: boolean; onClose: (mess: string) => void }
type Category = {
  _id: string
  title: string
  slug: string
  description: string
}

const AddModal = (props: Props) => {
  const queryClient = useQueryClient()
  //   console.log(data)
  const { isLoading, isError, data, error } = useQuery("category", getCategory)
  const postCategory = () => {
    const agency = data
    return agency.filter(
      (category: Category) => category.description === "post"
    )
  }

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    description: "",
    userCreate: "",
    status: "",
  })

  const [mess, setMess] = useState("")
  const addMutation = useMutation(addPost, {
    onSuccess: () => {
      queryClient.prefetchQuery("post", getPost)
      setMess("success")
      props.onClose(mess)
    },
    onError: () => {
      setMess("error")
    },
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  //textarea
  const [value, setValue] = useState("")
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  )

  const handleSubmit = (e: any) => {
    e.preventDefault()
    formData.content = value
    formData.userCreate = "644542307bfe2a59e1620ccc"
    const model = formData
    addMutation.mutate(model)
    setFormData({
      title: "",
      category: "",
      content: "",
      description: "",
      userCreate: "",
      status: "",
    })
  }

  if (!props.visible) return null
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-20">
      <div className="relative w-full max-w-3xl max-h-full overflow-y-auto scrollbar-style">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 className="text-2xl font-semibold text-gray-900 ">
              Add New Post
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
                  name="title"
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 "
                  placeholder=" "
                  onChange={handleChange}
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Title
                </label>
              </div>
              <div className="relative border-2 border-gray-400 rounded-lg">
                <select
                  name="category"
                  onChange={handleChange}
                  defaultValue={"DEFAULT"}
                  className="block px-2.5 py-2.5 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                >
                  <option className="relative" value="DEFAULT">
                    Choose Category
                  </option>
                  {postCategory().map((category: Category) => (
                    <option key={category._id} value={category.title}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative border-2 border-gray-400 rounded-lg h-72 overflow-y-auto scrollbar-style">
                <ReactQuill
                  placeholder="nội dung"
                  className="text-gray-950 h-full"
                  modules={AddModal.modules}
                  formats={AddModal.formats}
                  onChange={(e: any) => {
                    setValue(e)
                    console.log(value)
                  }}
                />
              </div>
              <div className="relative border-2 border-gray-400 rounded-lg">
                <input
                  type="text"
                  name="description"
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 "
                  placeholder=" "
                  onChange={handleChange}
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Description
                </label>
              </div>
              <div className="relative flex flex-row items-center gap-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    value={"active"}
                    id="radioDefault1"
                    onChange={handleChange}
                    name="status"
                    className="form-check-input appearance-none rounded-full h-5 w-5 border border-gray-300 checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  />
                  <label
                    htmlFor="radioDefault1"
                    className="inline-block text-gray-900 text-xl"
                  >
                    Active
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    value={"block"}
                    id="radioDefault2"
                    name="status"
                    onChange={handleChange}
                    className="form-check-input appearance-none rounded-full h-5 w-5 border border-gray-300 checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  />
                  <label
                    htmlFor="radioDefault2"
                    className="inline-block text-gray-900 text-xl"
                  >
                    Block
                  </label>
                </div>
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
              <button
                type="submit"
                className="sm:w-1/2 text-green-900 bg-white border border-green-900 hover:bg-green-800  hover:transition-all hover:duration-500 ease-in-out hover:text-white  font-medium rounded-lg text-lg px-5 py-2.5 text-center "
              >
                Add
              </button>
              <button
                onClick={() => props.onClose("close")}
                className="sm:w-1/2 text-gray-950 bg-white border border-gray-900 hover:bg-gray-900 hover:transition-all hover:duration-500 ease-in-out hover:text-white  font-medium rounded-lg text-lg px-5 py-2.5 text-center "
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

AddModal.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
}
AddModal.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "code-block",
]

export default AddModal
