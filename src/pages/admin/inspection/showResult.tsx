import AdminLayout from "@/layouts/AdminLayout"
import { getInspectionResultId } from "@/lib/helper"
import { NextPageWithLayout } from "@/pages/_app"
import { useRouter } from "next/router"
import React from "react"
import { useQuery } from "react-query"
import { ToastContainer } from "react-toastify"

type Props = {}

const ShowResult: NextPageWithLayout = (props: Props) => {
  const router = useRouter()
  const { idPlan } = router.query
  const dataResult = useQuery("inspectionResult", () =>
    getInspectionResultId(idPlan as string)
  )
  console.log(dataResult)
  if (dataResult.isLoading) return <div>Đang tải dữ liệu...</div>
  if (dataResult.isError) return <div>Lỗi khi tải dữ liệu </div>
  return (
    <div className="sm:p-8 p-4 bg-gray-300 h-screen w-full overflow-y-auto">
      <h1 className="p-4 sm:p-0 text-2xl font-semibold uppercase text-gray-700">
        Kết quả thanh tra
      </h1>
      <form>
        <div className="bg-white w-full border p-4 mt-4  rounded-lg h-fit  ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[90%] sm:h-fit">
            <div className="h-fit">
              <div className="relative border-2 border-gray-400 rounded-lg mb-10">
                <input
                  type="text"
                  name="name"
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 "
                  placeholder=" "
                  disabled
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Tên kế hoạch
                </label>
              </div>
              <div className="relative border-2 border-gray-400 rounded-lg mb-10">
                <input
                  type="text"
                  name="name"
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 "
                  placeholder=" "
                  disabled
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Loại kế hoạch
                </label>
              </div>
              <div className="relative border-2 border-gray-400 rounded-lg mb-10">
                <input
                  type="text"
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 capitalize"
                  placeholder=" "
                  disabled
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Tên cơ sở thanh tra
                </label>
              </div>
              <div className="relative border-2 border-gray-400 rounded-lg mb-10">
                <input
                  type="text"
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 capitalize"
                  placeholder=" "
                  disabled
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Hình thức kinh doanh
                </label>
              </div>
              <div className="relative border-2 border-gray-400 rounded-lg mb-10">
                <input
                  type="text"
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 capitalize"
                  placeholder=" "
                  disabled
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Kết quả
                </label>
              </div>
              <div className="relative border-2 border-gray-400 rounded-lg mb-10">
                <input
                  type="text"
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 capitalize"
                  placeholder=" "
                  disabled
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Thông tin bổ xung
                </label>
              </div>
              <div className="relative border-2 border-gray-400 rounded-lg mb-10">
                <input
                  type="text"
                  defaultValue={
                    dataResult.data.idInspectionPlan.idStore.address.street +
                    ", " +
                    dataResult.data.idInspectionPlan.idStore.address.ward +
                    ", " +
                    dataResult.data.idInspectionPlan.idStore.address.district +
                    ", Đà Nẵng"
                  }
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 capitalize"
                  placeholder=" "
                  disabled
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Địa chỉ
                </label>
              </div>
            </div>
            <div className="relative border-2 border-gray-400 rounded-lg">
              <div className="sm:m-4 min-h-[5vh] text-gray-900">
                <h1 className=" p-2 sm:text-2xl text-xs font-medium sm:font-semibold uppercase ">
                  Hình ảnh minh chứng
                </h1>
                <div className="h-[43vh] overflow-y-auto scrollbar-style">
                  {dataResult.data.img.map((image: any) => (
                    <img src={image} alt="anh minh chung" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

ShowResult.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default ShowResult
