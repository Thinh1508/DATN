import SideBar from "@/layouts/SideBar"
import React from "react"

type Props = {}

const IntroducePage = (props: Props) => {
  return (
    <div className="bg-white flex-1">
      <div className="grid grid-cols-10 space-x-8 pt-4 container mx-auto scrollbar-style ">
        <div className="col-span-10 lg:col-span-7 mb-4 bg-white  shadow-xl h-full">
          <div className="border-t-4 border-t-[#049803] mt-2 pt-2 text-gray-950 px-2">
            <h1>
              Tên đề tài: Xây dựng Website quản lý tình trạng vệ sinh an toàn
              thực phẩm tại Thành phố Đà Nẵng
            </h1>
            <h1>Người thực hiện: Huỳnh Văn Thịnh</h1>
            <h1>Thời gian thực hiện: 3 tháng(3/2023-6/2023)</h1>
          </div>
        </div>
        <SideBar />
      </div>
    </div>
  )
}

export default IntroducePage
