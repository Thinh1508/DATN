import Link from "next/link"
import React from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import "swiper/css/effect-creative"

import SideBar from "@/layouts/SideBar"
import { SliderSame } from "@/feature/Home/components/Slider"

type Props = {
  data: any
  dataSame: any
}

const PostDetail = ({ data, dataSame }: Props) => {
  return (
    <div className="bg-white">
      <div className="grid grid-cols-10 space-x-8 pt-4 container mx-auto scrollbar-style">
        <div className="col-span-10 lg:col-span-7 mt-2 mb-4 pt-2  space-y-4 bg-white border-t-4 border-t-[#049803] shadow-xl h-fit">
          <div className="p-4 h-fit text-gray-950">
            <h1 className="text-[#049803]  break-words font-semibold text-2xl relative">
              {data.title}
              <p className="inline-flex text-base font-semibold text-gray-600">
                ({data.createdAt.substring(0, 10)})
              </p>
            </h1>
            <div
              dangerouslySetInnerHTML={{ __html: data.content }}
              className="my-2"
            ></div>
            <p className="float-right mt-2">Ban Quản lý An toàn thực phẩm</p>
          </div>
          <hr />
          <div className="relative min-h-[250px]  border-t-4 border-t-green-600 !mt-10">
            <div className="p-2 gird grid-cols-3">
              <SliderSame data={dataSame} idPost={data._id} />
            </div>
            <Link href="#">
              <span className="absolute col-span-3 px-3 py-1 bg-green-600 uppercase text-slate-100  hover:text-yellow-400 -translate-y-5 text-sm font-bold top-0.5 rounded-r-full">
                Bài viết tương tự
              </span>
            </Link>
          </div>
        </div>
        <SideBar />
      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/post/${context.query.idPost}`
    )
    const data = await res.json()

    const Options = {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: context.query.category,
    }
    const response = await fetch(`http://localhost:3000/api/post/view`, Options)
    const dataSame = await response.json()

    return { props: { data, dataSame } }
  } catch (error) {
    console.error(error)
    return { props: { data: [], dataSame: [] } }
  }
}

export default PostDetail
