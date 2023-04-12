import React from "react"
import Notification from "@/feature/Home/components/Notification"
import SideBar from "@/layouts/SideBar"
// Import Swiper sty
import Link from "next/link"
import {
  SliderTop,
  SliderUser,
  SliderBanner,
} from "@/feature/Home/components/Slider"

type Props = {}

const HomePage = (props: Props) => {
  return (
    <div className="bg-white">
      <div className="grid grid-cols-10 space-x-8 pt-6 container mx-auto">
        <div className="col-span-10 lg:col-span-7 pt-2 pb-6 space-y-4 ">
          <div className="min-h-[450px] border-slate-900 gird grid-cols-8 space-x-4 drop-shadow-md">
            <SliderTop />
          </div>

          <div>
            <SliderBanner />
          </div>

          <Notification />

          <div className="relative min-h-[250px] border-[1px] rounded-lg border-slate-400 !mt-10">
            <div className="p-2 gird grid-cols-3">
              <SliderUser />
            </div>
            <Link href="#">
              <span className="absolute col-span-3 px-3 py-1 bg-green-600 uppercase text-slate-100  hover:text-yellow-400 -translate-y-5 text-sm font-bold top-0 left-3">
                dành cho người dùng
              </span>
            </Link>
          </div>

          <div>
            <img
              src="https://antoanthucpham.danang.gov.vn/documents/10181/10940/TXNG2.jpg"
              alt="thông điệp"
              className="w-full rounded-md"
            />
          </div>
        </div>
        <SideBar />
      </div>
    </div>
  )
}

export default HomePage
