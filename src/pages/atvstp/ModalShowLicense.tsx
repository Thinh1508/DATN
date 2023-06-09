import { getInspectionResultId } from "@/lib/helper"
import Link from "next/link"
import React from "react"
import { useQuery } from "react-query"

type Props = {
  idPlan: string
  onClose: () => void
}

const ModalShowLicense = (props: Props) => {
  const dataResult = useQuery("inspectionResult", () =>
    getInspectionResultId(props.idPlan as string)
  )
  console.log(dataResult)
  if (dataResult.isLoading) return <div>Đang tải dữ liệu...</div>
  if (dataResult.isError) return <div>Lỗi khi tải dữ liệu </div>
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="relative w-full max-w-3xl max-h-full">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 className="text-2xl font-semibold text-gray-900 ">
              Kết quả đăng kí giấy phép
            </h3>
            <button
              type="button"
              className="text-gray-400 text-sm bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center "
              onClick={() => {
                props.onClose()
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
          <div className="p-6 space-y-10 h-fit overflow-y-auto scrollbar-style">
            <div
              className={`relative ${
                dataResult.data.content !== "3" &&
                "h-[55vh] overflow-y-auto scrollbar-style"
              }`}
            >
              <h1 className="text-red-700 font-bold text-3xl uppercase ">
                {dataResult.data.content === "3"
                  ? "Đăng kí thành công"
                  : "Đăng kí thất bại"}
              </h1>
              {dataResult.data.content !== "3" && dataResult.data.img && (
                <div className="relative border-2 border-gray-400 rounded-lg mt-4 p-4">
                  {dataResult.data.img.map((url: string) => (
                    <Link href={url} target="_blank" key={url}>
                      <img src={url} className="w-full h-fit" />
                    </Link>
                  ))}
                  <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                    Ảnh lý do
                  </label>
                </div>
              )}
            </div>
          </div>
          {/* <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
            <button
              onClick={() => props.onClose()}
              className="sm:w-1/2 text-gray-950 bg-white border border-gray-900 hover:bg-gray-900 hover:transition-all hover:duration-500 ease-in-out hover:text-white  font-medium rounded-lg text-lg px-5 py-2.5 text-center "
            >
              Đóng
            </button>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default ModalShowLicense
