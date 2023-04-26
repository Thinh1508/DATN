import React, { useMemo, useState } from "react"
import { useQueryClient, useMutation, useQuery } from "react-query"

import { getCategory, getPost, updateCategory, updatePost } from "@/lib/helper"
import dynamic from "next/dynamic"
type Category = {
  _id: string
  title: string
  slug: string
  description: string
  createdAt: string
  updatedAt: string
}
type Post = {
  _id: string
  title: string
  category: string
  content: string
  description: string
  userCreate: string
  status: string
}

type Props = {
  visible: boolean
  onClose: (mess: String, modal: String) => void
  postInfo: Post
}

const EditModal = (props: Props) => {
  const { postInfo: postData } = props
  const queryClient = useQueryClient()
  const { isLoading, isError, data, error } = useQuery("category", getCategory)
  const postCategory = () => {
    const agency = data
    return agency.filter(
      (category: Category) => category.description === "post"
    )
  }

  const [formData, setFormData] = useState<Post>(postData)
  const [mess, setMess] = useState("")

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const updateMutation = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.prefetchQuery("post", getPost)
      props.onClose(mess, "Edit Account")
      setMess("success")
      setFormData({
        _id: "",
        title: "",
        category: "",
        content: "",
        description: "",
        userCreate: "",
        status: "",
      })
    },
    onError: () => {
      setMess("error")
    },
  })

  const handleSubmit = async (e: any) => {
    console.log(formData)
    e.preventDefault()
    const model = formData
    model._id = formData._id ? formData._id : postData._id
    model.title = formData.title ? formData.title : postData.title
    model.category = formData.category ? formData.category : postData.category
    model.content = value ? value : postData.title
    model.description = formData.description
      ? formData.description
      : postData.description
    model.userCreate = formData.userCreate
      ? formData.userCreate
      : postData.userCreate
    model.status = formData.status ? formData.status : postData.status
    updateMutation.mutate({ postId: postData._id, formData: model })
  }

  const [value, setValue] = useState("")
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  )

  if (isLoading) return <div>Employee is Loading...</div>
  if (isError) return <div>Got Error {`${error}`}</div>
  if (!props.visible) return null
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-20">
      <div className="relative w-full max-w-3xl max-h-full">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 className="text-2xl font-semibold text-gray-900 ">
              Edit Account
            </h3>
            <button
              type="button"
              className="text-gray-400 text-sm bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center "
              onClick={() => {
                props.onClose("close", "")
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
            <div className="p-6 space-y-5 ">
              <div className="relative border-2 border-gray-400 rounded-lg">
                <input
                  type="text"
                  name="title"
                  defaultValue={postData.title}
                  onChange={handleChange}
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 capitalize"
                  placeholder=" "
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Title
                </label>
              </div>
              <div className="relative border-2 border-gray-400 rounded-lg">
                <select
                  name="category"
                  defaultValue={postData.category}
                  onChange={handleChange}
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
              <div className="relative border-2 border-gray-400 rounded-lg h-[400px] ">
                <ReactQuill
                  placeholder="nội dung"
                  className="text-gray-950 h-5/6"
                  defaultValue={postData.content}
                  modules={EditModal.modules}
                  formats={EditModal.formats}
                  onChange={(e: any) => {
                    setValue(e)
                  }}
                />
              </div>
              <div className="relative border-2 border-gray-400 rounded-lg">
                <input
                  type="text"
                  name="description"
                  defaultValue={postData.description}
                  onChange={handleChange}
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 "
                  placeholder=" "
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
                    name="status"
                    onChange={handleChange}
                    defaultChecked={postData.status == "active"}
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
                    defaultChecked={postData.status !== "active"}
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
                className="sm:w-1/2 text-yellow-700 bg-white border border-yellow-700 hover:bg-yellow-700 hover:transition-all hover:duration-500 ease-in-out hover:text-white  font-medium rounded-lg text-lg px-5 py-2.5 text-center "
              >
                Edit
              </button>
              <button
                onClick={() => props.onClose("close", "")}
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

EditModal.modules = {
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
EditModal.formats = [
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

export default EditModal
