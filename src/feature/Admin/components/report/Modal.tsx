import Link from "next/link"
import React from "react"

type Props = {
  onClose: () => void
  visible: boolean
  reportData: Report
}
type Report = {
  _id: string
  idUser: {
    _id: string
    name: string
  }
  idStore: {
    _id: string
    idUser: string
    name: string
    imageBusiness: string
    type: string
    address: string
    status: string
  }
  content: string
  imageReport: string
  status: string
  createdAt: string
}

const Modal = (props: Props) => {
  const { reportData: data } = props
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-20">
      <div className="relative w-full max-w-3xl max-h-full">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 className="text-2xl font-semibold text-gray-900 ">
              Thông tin báo cáo
            </h3>
            <button
              type="button"
              className="text-gray-400 text-sm bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center "
              onClick={props.onClose}
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
            <div className="p-6 space-y-10 h-[70vh] overflow-y-auto scrollbar-style">
              <div className="relative border-2 border-gray-400 rounded-lg">
                <input
                  type="text"
                  name="name"
                  defaultValue={data.idStore.name}
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 "
                  placeholder=" "
                  disabled
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Tên cơ sở
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative border-2 border-gray-400 rounded-lg">
                  <input
                    type="text"
                    defaultValue={data.idStore.type}
                    className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 "
                    placeholder=" "
                    disabled
                  />
                  <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                    Loại kinh doanh
                  </label>
                </div>
                <div className="relative border-2 border-gray-400 rounded-lg">
                  <input
                    type="text"
                    defaultValue={data.createdAt.slice(0, 10)}
                    className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 "
                    placeholder=" "
                    disabled
                  />
                  <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                    ngày báo cáo
                  </label>
                </div>
              </div>
              <div className="relative border-2 border-gray-400 rounded-lg">
                <input
                  type="text"
                  defaultValue={data.idStore.address}
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 "
                  placeholder=" "
                  disabled
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Địa chỉ
                </label>
              </div>
              <div className="relative border-2 border-gray-400 rounded-lg">
                <textarea
                  name="content"
                  defaultValue={data.content}
                  disabled
                  className="block p-2.5 w-full text-xl text-gray-950 bg-transparent rounded-lg border border-gray-200 focus:outline-none scrollbar-style"
                  placeholder=""
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Nội dung báo cáo
                </label>
              </div>
              <div className="relative border-2 border-gray-400 rounded-lg p-4">
                <Link href={data.imageReport} target="_blank">
                  <img src={data.imageReport} className="w-full h-fit" />
                </Link>
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Ảnh minh chứng báo cáo
                </label>
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
              {data.status === "pending" && (
                <Link
                  href={{
                    pathname: "/admin/inspection/planning",
                    query: {
                      store: JSON.stringify(data.idStore),
                      idCertificateReg: data._id,
                      type: "report",
                    },
                  }}
                  className="sm:w-1/2 text-green-900 bg-white border border-green-900 hover:bg-green-800  hover:transition-all hover:duration-500 ease-in-out hover:text-white  font-medium rounded-lg text-lg px-5 py-2.5 text-center "
                >
                  Lên kế hoạch
                </Link>
              )}
              <button
                type="button"
                onClick={props.onClose}
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

export default Modal
