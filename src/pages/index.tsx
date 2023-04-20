import React from "react"
import Image from "next/image"
import SideBar from "@/layouts/SideBar"
// Import Swiper sty
import Link from "next/link"
import {
  SliderTop,
  SliderUser,
  SliderBanner,
} from "@/feature/Home/components/Slider"
import Notification from "@/feature/Home/components/Notification"

type Props = {}

const HomePage = (props: Props) => {
  return (
    <div className="bg-white">
      <div className="grid grid-cols-10 space-x-8 pt-4 container mx-auto">
        <div className="col-span-10 lg:col-span-7 pt-2 pb-6 space-y-4 ">
          <div className="min-h-[450px] border-slate-900 gird grid-cols-8 space-x-4 drop-shadow-md">
            <SliderTop />
          </div>

          <div>
            <SliderBanner />
          </div>

          <Notification />

          <div className="grid grid-cols-3 min-h-[350px] py-10">
            <div className="relative gird grid-cols-1 items-center">
              <img
                src="https://dibo.vn/wp-content/uploads/2020/12/news.jpg"
                alt="tin tức hoạt động"
                className="w-full h-full"
              />
              <div className=" absolute top-1/2 mx-14">
                <h1
                  className="font-bold text-base uppercase
                text-gray-900 p-4 bg-white opacity-70 cursor-pointer  hover:text-green-600 "
                >
                  tin tức hoat động
                </h1>
              </div>
            </div>
            <div className="relative gird grid-cols-1 items-center">
              <img
                src="https://img.timviecbaochi.com/2020/08/truyen-thong-la-gi-1.jpg"
                alt="truyền thong"
                className="w-full h-full"
              />
              <div className="absolute items-center top-1/2 mx-24">
                <h1
                  className="font-bold text-base uppercase
                text-gray-900 p-4 bg-white opacity-70 cursor-pointer  hover:text-green-600"
                >
                  truyền thông
                </h1>
              </div>
            </div>
            <div className="relative gird grid-cols-1 items-center">
              <img
                src="https://vhnbio.vn/assets/upload/images/news/che_do_an_tang_cuong_suc_khoe.png"
                alt="sức khỏe và thực phẩm"
                className="w-full h-full"
              />
              <div className="absolute items-center top-1/2 mx-14 ">
                <h1
                  className="font-bold text-base uppercase
                text-gray-900 p-4 bg-white opacity-70 cursor-pointer  hover:text-green-600"
                >
                  Thực phẩm và sức khỏe
                </h1>
              </div>
            </div>
          </div>

          <div className="relative min-h-[250px] border-[1px] border-slate-400 !mt-10">
            <div className="p-2 gird grid-cols-3">
              <SliderUser />
            </div>
            <Link href="#">
              <span className="absolute col-span-3 px-3 py-1 bg-green-600 uppercase text-slate-100  hover:text-yellow-400 -translate-y-5 text-sm font-bold top-0 left-3">
                dành cho người tiêu dùng
              </span>
            </Link>
          </div>
        </div>
        <SideBar />
      </div>
    </div>
  )
}

export default HomePage