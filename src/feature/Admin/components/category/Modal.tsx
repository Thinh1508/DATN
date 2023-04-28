import { addCategory, getCategory, updateCategory } from "@/lib/helper"
import React, { useState } from "react"
import { useMutation, useQueryClient } from "react-query"

type Category = {
  _id: string
  title: string
  slug: string
  description: string
  createdAt: string
  updatedAt: string
}
type Props = {
  action: string
  onClose: (mess: string) => void
  visible: boolean
  categoryData: Category
}

const Modal = (props: Props) => {
  const queryClient = useQueryClient()
  const { categoryData: data } = props

  function slug(title: string) {
    //Đổi chữ hoa thành chữ thường
    let slug = title.toLowerCase()

    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a")
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e")
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i")
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o")
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u")
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y")
    slug = slug.replace(/đ/gi, "d")
    //Xóa các ký tự đặt biệt
    slug = slug.replace(
      /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
      ""
    )
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-")
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, "-")
    slug = slug.replace(/\-\-\-\-/gi, "-")
    slug = slug.replace(/\-\-\-/gi, "-")
    slug = slug.replace(/\-\-/gi, "-")
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = "@" + slug + "@"
    slug = slug.replace(/\@\-|\-\@|\@/gi, "")
    return slug
  }

  const [mess, setMess] = useState("")
  const [isValTitle, setValTitle] = useState(true)
  const [formData, setFormData] = useState<Category>(data)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const addMutation = useMutation(addCategory, {
    onSuccess: () => {
      queryClient.prefetchQuery("category", getCategory)
      setMess("success")
      setValTitle(true)
      props.onClose(mess)
    },
    onError: () => {
      setMess("error")
    },
  })
  const updateMutation = useMutation(updateCategory, {
    onSuccess: () => {
      queryClient.prefetchQuery("category", getCategory)
      setMess("success")
      props.onClose(mess)
    },
    onError: () => {
      setMess("error")
    },
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (formData.title) {
      const model = formData
      model._id = data._id
      model.slug = slug(model.title)
      if (props.action == "add") addMutation.mutate(model)
      if (props.action == "edit")
        updateMutation.mutate({ categoryId: data._id, formData: model })
    }
  }

  switch (props.action) {
    case "view":
      return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-20">
          <div className="relative w-full max-w-3xl max-h-full">
            <div className="relative bg-white rounded-lg shadow ">
              <div className="flex items-start justify-between p-4 border-b rounded-t ">
                <h3 className="text-2xl font-semibold text-gray-900 ">
                  Danh mục
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
                      defaultValue={data.title}
                      className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 "
                      placeholder=" "
                      disabled
                    />
                    <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                      Tiêu đề
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative border-2 border-gray-400 rounded-lg">
                      <input
                        type="text"
                        defaultValue={data.slug}
                        className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 "
                        placeholder=" "
                        disabled
                      />
                      <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                        Slug
                      </label>
                    </div>
                    <div className="relative border-2 border-gray-400 rounded-lg">
                      <input
                        type="text"
                        defaultValue={data.description}
                        className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 "
                        placeholder=" "
                        disabled
                      />
                      <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                        Loại danh mục
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative border-2 border-gray-400 rounded-lg">
                      <input
                        type="text"
                        defaultValue={data.updatedAt}
                        className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 "
                        placeholder=" "
                        disabled
                      />
                      <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                        Ngày tạo
                      </label>
                    </div>
                    <div className="relative border-2 border-gray-400 rounded-lg">
                      <input
                        type="text"
                        defaultValue={data.createdAt}
                        className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 "
                        placeholder=" "
                        disabled
                      />
                      <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                        Ngày cập nhập
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
                  <button
                    type="button"
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
          <div className="relative w-full max-w-3xl max-h-full overflow-y-auto scrollbar-style">
            <div className="relative bg-white rounded-lg shadow ">
              <div className="flex items-start justify-between p-4 border-b rounded-t ">
                <h3 className="text-2xl font-semibold text-gray-900 ">
                  Thêm mới danh mục
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
                <div className="p-6 space-y-10">
                  <div className="relative border-2 border-gray-400 rounded-lg">
                    <input
                      type="text"
                      name="title"
                      className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 capitalize"
                      placeholder=" "
                      onChange={(e) => {
                        handleChange(e)
                        e.target.value.length > 0
                          ? setValTitle(true)
                          : setValTitle(false)
                      }}
                    />
                    <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                      Tiêu đề
                    </label>
                    <span
                      className={`absolute ${
                        isValTitle && "hidden"
                      } text-sm text-red-600 font-semibold left-0 -bottom-6`}
                    >
                      Bạn phải nhập tiêu đề
                    </span>
                  </div>
                  <div className="relative border-2 border-gray-400 rounded-lg">
                    <select
                      name="description"
                      onChange={handleChange}
                      defaultValue={"DEFAULT"}
                      className="block px-2.5 py-2.5 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    >
                      <option className="relative" value="DEFAULT">
                        Chọn loại danh mục
                      </option>
                      <option value="agency">Agency</option>
                      <option value="document">Document</option>
                      <option value="post">Post</option>
                    </select>
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
                    type="button"
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
                  Chỉnh sửa danh mục
                </h3>
                <button
                  type="button"
                  className="text-gray-400 text-sm bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center "
                  onClick={() => {
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
                      onChange={(e) => {
                        handleChange(e)
                        e.target.value.length > 0
                          ? setValTitle(true)
                          : setValTitle(false)
                      }}
                      name="title"
                      defaultValue={data.title}
                      className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 capitalize"
                      placeholder=" "
                    />
                    <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                      Title
                    </label>
                    <span
                      className={`absolute ${
                        isValTitle && "hidden"
                      } text-sm text-red-600 font-semibold left-0 -bottom-6`}
                    >
                      Bạn phải nhập tiêu đề
                    </span>
                  </div>

                  <div className="relative border-2 border-gray-400 rounded-lg">
                    <select
                      name="description"
                      onChange={handleChange}
                      defaultValue={data.description}
                      className="block px-2.5 py-2.5 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    >
                      <option value="agency">Agency</option>
                      <option value="document">Document</option>
                      <option value="post">Post</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
                  <button
                    type="submit"
                    className="sm:w-1/2 text-yellow-700 bg-white border border-yellow-700 hover:bg-yellow-700 hover:transition-all hover:duration-500 ease-in-out hover:text-white  font-medium rounded-lg text-lg px-5 py-2.5 text-center "
                  >
                    Lưu
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
