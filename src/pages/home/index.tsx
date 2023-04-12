import React from "react"
import Header from "@/layouts/Header"
import Footer from "@/layouts/Footer"
import Image from "next/image"
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
      <Header />
      <div className="grid grid-cols-10 space-x-8 pt-4 container mx-auto">
        <div className="col-span-10 lg:col-span-7 pt-2 pb-6 space-y-4 ">
          <div className="min-h-[450px] border-slate-900 gird grid-cols-8 space-x-4 drop-shadow-md">
            <SliderTop />
          </div>

          <div>
            <img
              src="https://danahomeland.vn/uploads/media_gal/43-0banner-tc.jpg"
              alt="thông điệp"
              className="w-full rounded-lg"
            />
          </div>

          <div className="relative min-h-[400px] border-[1px]  border-slate-400 !mt-10">
            <div className="flex h-full p-4 gap-6">
              <a className="h-full w-[350px] block" href="#">
                <img
                  src="https://antoanthucpham.danang.gov.vn/documents/10181/45038/Nhanh_1011_h3.jpg/ed8251b4-a7d9-40cb-820f-bb7a7dfa89c4?t=1668062075138"
                  alt=""
                  className="w-full max-h-[370px] object-cover"
                />
              </a>
              <div className="flex-1 space-y-2">
                <a
                  className="text-slate-900 font-bold block gap-4 hover:text-green-600 border-b-[1px] border-slate-900 pb-2 !mb-5"
                  href="#"
                >
                  <p className="flex-1 text-green-600">
                    HOÀ VANG TRIỂN KHAI HƯỚNG DẪN HỆ THỐNG TXNG TRÊN ĐỊA BÀN CÁC
                    XÃ
                  </p>
                </a>
                <ul>
                  <li>
                    <a
                      className="text-slate-900 font-bold flex gap-2 mb-2 hover:text-green-600 text-sm"
                      href=""
                    >
                      <div className="h-3 w-3 mt-1 text-teal-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          fill="currentColor"
                        >
                          <path d="M246.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L178.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C47.63 444.9 55.81 448 64 448s16.38-3.125 22.62-9.375l160-160C259.1 266.1 259.1 245.9 246.6 233.4zM438.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L370.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C239.6 444.9 247.8 448 256 448s16.38-3.125 22.62-9.375l160-160C451.1 266.1 451.1 245.9 438.6 233.4z" />
                        </svg>
                      </div>
                      <p className="flex-1 font-normal">
                        KHAI GIẢNG LỚP BỒI DƯỠNG NGHIỆP VỤ THANH TRA CHUYÊN
                        NGÀNH AN TOÀN THỰC PHẨM
                      </p>
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-slate-900 font-bold flex mb-2 gap-2 hover:text-green-600 text-sm"
                      href=""
                    >
                      <div className="h-3 w-3 mt-1 text-teal-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          fill="currentColor"
                        >
                          <path d="M246.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L178.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C47.63 444.9 55.81 448 64 448s16.38-3.125 22.62-9.375l160-160C259.1 266.1 259.1 245.9 246.6 233.4zM438.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L370.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C239.6 444.9 247.8 448 256 448s16.38-3.125 22.62-9.375l160-160C451.1 266.1 451.1 245.9 438.6 233.4z" />
                        </svg>
                      </div>
                      <p className="flex-1 font-normal">
                        KHAI GIẢNG LỚP BỒI DƯỠNG NGHIỆP VỤ THANH TRA CHUYÊN
                        NGÀNH AN TOÀN THỰC PHẨM
                      </p>
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-slate-900 font-bold mb-2 flex gap-2 hover:text-green-600 text-sm"
                      href=""
                    >
                      <div className="h-3 w-3 mt-1 text-teal-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          fill="currentColor"
                        >
                          <path d="M246.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L178.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C47.63 444.9 55.81 448 64 448s16.38-3.125 22.62-9.375l160-160C259.1 266.1 259.1 245.9 246.6 233.4zM438.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L370.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C239.6 444.9 247.8 448 256 448s16.38-3.125 22.62-9.375l160-160C451.1 266.1 451.1 245.9 438.6 233.4z" />
                        </svg>
                      </div>
                      <p className="flex-1 font-normal">
                        TUYÊN TRUYỀN, TẬP HUẤN NÂNG CAO KIẾN THỨC VỀ AN TOÀN
                        THỰC PHẨM CHO CÁN BỘ CÔNG ĐOÀN CƠ SỞ THUỘC LIÊN ĐOÀN LAO
                        ĐỘNG THÀNH PHỐ ĐÀ NẴNG
                      </p>
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-slate-900 font-bold mb-2 flex gap-2 hover:text-green-600 text-sm"
                      href=""
                    >
                      <div className="h-3 w-3 mt-1 text-teal-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          fill="currentColor"
                        >
                          <path d="M246.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L178.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C47.63 444.9 55.81 448 64 448s16.38-3.125 22.62-9.375l160-160C259.1 266.1 259.1 245.9 246.6 233.4zM438.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L370.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C239.6 444.9 247.8 448 256 448s16.38-3.125 22.62-9.375l160-160C451.1 266.1 451.1 245.9 438.6 233.4z" />
                        </svg>
                      </div>
                      <p className="flex-1 font-normal">
                        TUYÊN TRUYỀN, TẬP HUẤN NÂNG CAO KIẾN THỨC VỀ AN TOÀN
                        THỰC PHẨM CHO CÁN BỘ CÔNG ĐOÀN CƠ SỞ THUỘC LIÊN ĐOÀN LAO
                        ĐỘNG THÀNH PHỐ ĐÀ NẴNG
                      </p>
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-slate-900 font-bold mb-2 flex gap-2 hover:text-green-600 text-sm"
                      href=""
                    >
                      <div className="h-3 w-3 mt-1 text-teal-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          fill="currentColor"
                        >
                          <path d="M246.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L178.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C47.63 444.9 55.81 448 64 448s16.38-3.125 22.62-9.375l160-160C259.1 266.1 259.1 245.9 246.6 233.4zM438.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L370.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C239.6 444.9 247.8 448 256 448s16.38-3.125 22.62-9.375l160-160C451.1 266.1 451.1 245.9 438.6 233.4z" />
                        </svg>
                      </div>
                      <p className="flex-1 font-normal">
                        TUYÊN TRUYỀN, TẬP HUẤN NÂNG CAO KIẾN THỨC VỀ AN TOÀN
                        THỰC PHẨM CHO CÁN BỘ CÔNG ĐOÀN CƠ SỞ THUỘC LIÊN ĐOÀN LAO
                        ĐỘNG THÀNH PHỐ ĐÀ NẴNG
                      </p>
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-slate-900 font-bold mb-2 flex gap-2 hover:text-green-600 text-sm"
                      href=""
                    >
                      <div className="h-3 w-3 mt-1 text-teal-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          fill="currentColor"
                        >
                          <path d="M246.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L178.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C47.63 444.9 55.81 448 64 448s16.38-3.125 22.62-9.375l160-160C259.1 266.1 259.1 245.9 246.6 233.4zM438.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L370.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C239.6 444.9 247.8 448 256 448s16.38-3.125 22.62-9.375l160-160C451.1 266.1 451.1 245.9 438.6 233.4z" />
                        </svg>
                      </div>
                      <p className="flex-1 font-normal">
                        TUYÊN TRUYỀN, TẬP HUẤN NÂNG CAO KIẾN THỨC VỀ AN TOÀN
                        THỰC PHẨM CHO CÁN BỘ CÔNG ĐOÀN CƠ SỞ THUỘC LIÊN ĐOÀN LAO
                        ĐỘNG THÀNH PHỐ ĐÀ NẴNG
                      </p>
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-slate-900 font-bold mb-2 flex gap-2 hover:text-green-600 text-sm"
                      href=""
                    >
                      <div className="h-3 w-3 mt-1 text-teal-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          fill="currentColor"
                        >
                          <path d="M246.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L178.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C47.63 444.9 55.81 448 64 448s16.38-3.125 22.62-9.375l160-160C259.1 266.1 259.1 245.9 246.6 233.4zM438.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L370.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C239.6 444.9 247.8 448 256 448s16.38-3.125 22.62-9.375l160-160C451.1 266.1 451.1 245.9 438.6 233.4z" />
                        </svg>
                      </div>
                      <p className="flex-1 font-normal uppercase">
                        Chương trình hành động về thực hành tiết kiệm, chống
                        lãng phí năm 2023 của Cục An toàn thực phẩm
                      </p>
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-slate-900 font-bold mb-2 flex gap-2 hover:text-green-600 text-sm"
                      href=""
                    >
                      <div className="h-3 w-3 mt-1 text-teal-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          fill="currentColor"
                        >
                          <path d="M246.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L178.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C47.63 444.9 55.81 448 64 448s16.38-3.125 22.62-9.375l160-160C259.1 266.1 259.1 245.9 246.6 233.4zM438.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L370.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C239.6 444.9 247.8 448 256 448s16.38-3.125 22.62-9.375l160-160C451.1 266.1 451.1 245.9 438.6 233.4z" />
                        </svg>
                      </div>
                      <p className="flex-1 font-normal uppercase">
                        Cục ATTP tổ chức lễ kỷ niệm 78 năm thành lập Quân đội
                        nhân dân Việt Nam
                      </p>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <a href="#">
              <span className="absolute col-span-3 px-3 py-1 bg-green-600 uppercase text-slate-100  hover:text-yellow-400 -translate-y-5 text-sm font-bold top-0 left-3">
                thông báo
              </span>
            </a>
          </div>

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
      <Footer />
    </div>
  )
}

export default HomePage
