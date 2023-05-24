import React from "react"

type Props = {}

const ProfileModal = (props: Props) => {
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
              //   onClick={() => props.onClose("close")}
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
          <form
          //   onSubmit={handleSubmit}
          >
            <div className=" space-y-5 ">
              {/* <div className="relative border-2 border-gray-400 rounded-lg">
            <input
              type="text"
              name="title"
              required
              className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 capitalize"
              placeholder=" "
              onChange={handleChange}
            />
            <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
              Tiêu đề
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
                Danh mục
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
              placeholder="Nội dung..."
              className="text-gray-950 h-5/6 scrollbar-style"
              modules={Modal.modules}
              formats={Modal.formats}
              onChange={(e: any) => {
                setValue(e)
              }}
            />
          </div>
          <div className="relative border-2 border-gray-400 rounded-lg">
            <input
              type="text"
              name="description"
              required
              className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 "
              placeholder=" "
              onChange={handleChange}
            />
            <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
              Mô tả
            </label>
          </div>
          <div className="relative border-2 border-gray-400 rounded-lg">
            <input
              type="file"
              placeholder="Image"
              accept=".png, .jpg"
              onChange={handleFileChange}
              className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-900 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
            />
            <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
              Ảnh nền
            </label>
          </div> */}
              <div>
                <img
                  src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
                  alt=""
                  className="h-40 w-full"
                />
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
                // onClick={() => props.onClose("close")}
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
}

export default ProfileModal
