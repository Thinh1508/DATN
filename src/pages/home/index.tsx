import React from "react"
import Image from "next/image"
import SideBar from "@/layouts/SideBar"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
// Import Swiper styles
import "swiper/css"
import Link from "next/link"

type Props = {}

const HomePage = (props: Props) => {
  return (
    <div className="bg-white">
      <div className="grid grid-cols-10 space-x-8 pt-6 container mx-auto">
        <div className="col-span-10 lg:col-span-7 pt-2 pb-6 space-y-4 ">
          <div className="min-h-[450px] border-slate-900 gird grid-cols-8 space-x-4 drop-shadow-md">
            <Swiper
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={1}
              navigation
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
              className="ml-0 rounded-lg"
            >
              <SwiperSlide>
                <div className="space-y-2 ">
                  <Link
                    className="relative text-slate-900 font-bold gap-4 hover:text-green-600 group block"
                    href="#"
                  >
                    <div className="h-[500px]">
                      <img
                        src="https://antoanthucpham.danang.gov.vn/documents/10181/53698/2803_Thuong_h1.jpg"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="absolute bottom-0 left-0 right-0 bg-black/70 text-slate-200 font-bold px-4 py-2">
                      CHI BỘ BAN QUẢN LÝ AN TOÀN THỰC PHẨM “VỀ QUÊ MẸ” 2023
                    </p>
                    <div className="absolute inset-0 pointer-events-none group-hover:bg-black/30"></div>
                  </Link>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="space-y-2">
                  <a
                    className="relative text-slate-900 font-bold gap-4 hover:text-green-600 group block"
                    href="#"
                  >
                    <div className="h-[500px]">
                      <img
                        src="https://antoanthucpham.danang.gov.vn/documents/10181/53698/H2_TXNG.jpg/411d8757-58a3-49da-bbef-99948b6a60ae?t=1679383105698"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="absolute bottom-0 left-0 right-0 bg-black/70 text-slate-200 font-bold px-4 py-2">
                      BAN QUẢN LÝ AN TOÀN THỰC PHẨM TIẾP TỤC PHÁT TRIỂN CHUỖI
                      CUNG ỨNG THỊT HEO ĐẢM BẢO NGUỒN GỐC VÀ XUẤT XỨ
                    </p>
                    <div className="absolute inset-0 pointer-events-none group-hover:bg-black/30"></div>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="space-y-2">
                  <a
                    className="relative text-slate-900 font-bold gap-4 hover:text-green-600 group block"
                    href="#"
                  >
                    <div className="h-[500px]">
                      <img
                        src="https://antoanthucpham.danang.gov.vn/documents/10181/53698/tuan+le+ao+dai_h1.jpg/2bc36080-880f-4cc1-ad79-444929b116ea?t=1677642914239"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="absolute bottom-0 left-0 right-0 bg-black/70 text-slate-200 font-bold px-4 py-2">
                      BAN QUẢN LÝ AN TOÀN THỰC PHẨM HƯỞNG ỨNG “TUẦN LỄ ÁO DÀI”
                    </p>
                    <div className="absolute inset-0 pointer-events-none group-hover:bg-black/30"></div>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="space-y-2">
                  <a
                    className="relative text-slate-900 font-bold gap-4 hover:text-green-600 group block"
                    href="#"
                  >
                    <div className="h-[500px]">
                      <img
                        src="https://antoanthucpham.danang.gov.vn/documents/10181/0/09597b9a46929dccc483.jpg/9bdbea52-8670-4ad4-a438-fe2514bdee44?t=1673938201366"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="absolute bottom-0 left-0 right-0 bg-black/70 text-slate-200 font-bold px-4 py-2">
                      ĐÀ NẴNG KIỂM TRA, GIÁM SÁT ĐẢM BẢO AN TOÀN THỰC PHẨM TẾT
                      NGUYÊN ĐÁN QUÝ MÃO NĂM 2023 TRÊN ĐỊA BÀN THÀNH PHỐ
                    </p>
                    <div className="absolute inset-0 pointer-events-none group-hover:bg-black/30"></div>
                  </a>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          <div>
            <img
              src="https://danahomeland.vn/uploads/media_gal/43-0banner-tc.jpg"
              alt="thông điệp"
              className="w-full rounded-md"
            />
          </div>

          <div className="relative min-h-[250px] border-[1px] rounded-lg border-slate-400 !mt-10">
            <div className="flex h-full p-4 gap-6">
              <a
                className="h-full w-[350px] block"
                href="{{URL::to('/posts/'.$post->slug)}}"
              >
                <img
                  src="https://antoanthucpham.danang.gov.vn/documents/10181/45038/Nhanh_1011_h3.jpg/ed8251b4-a7d9-40cb-820f-bb7a7dfa89c4?t=1668062075138"
                  alt=""
                  className="w-full max-h-[250px] object-cover"
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
                </ul>
              </div>
            </div>
            <a href="#">
              <span className="absolute col-span-3 px-3 py-1 bg-green-600 uppercase text-slate-100  hover:text-yellow-400 -translate-y-5 text-sm font-bold top-0 left-3">
                thông báo
              </span>
            </a>
          </div>

          <div className="relative min-h-[250px] border-[1px] rounded-lg border-slate-400 !mt-10">
            <div className="p-2 gird grid-cols-3">
              <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={10}
                slidesPerView={3}
                navigation
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
                className="ml-0 "
              >
                <SwiperSlide>
                  <div className="min-h-[240px] col-span-3 bg-[#ebebeb] h-full rounded-lg">
                    <img
                      src="https://vfa.gov.vn/storage/upload/23-9400867.jpg"
                      alt=""
                      className="w-full h-40 p-2"
                    />
                    <p className="text-gray-700 text-base p-2 hover:text-green-600 cursor-pointer uppercase">
                      Thải độc gan sau Tết với dinh dưỡng lành mạnh
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="min-h-[240px] col-span-3 bg-[#ebebeb] h-full rounded-lg">
                    <img
                      src="https://vfa.gov.vn/storage/upload/22-1289129.jpg"
                      alt=""
                      className="w-full h-40 p-2"
                    />
                    <p className="text-gray-700 text-base p-2 hover:text-green-600 cursor-pointer uppercase">
                      An toàn thực phẩm cho các bữa tiệc nhiều món lựa chọn
                      (dạng buffet)
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="min-h-[240px] col-span-3 bg-[#ebebeb] h-full rounded-lg">
                    <img
                      src="https://vfa.gov.vn/storage/upload/23-5059215.jpg"
                      alt=""
                      className="w-full h-40 p-2"
                    />
                    <p className="text-gray-700 text-base p-2 hover:text-green-600 cursor-pointer uppercase">
                      Lầm tưởng về dinh dưỡng khiến bạn khó giảm cân
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="min-h-[240px] col-span-3 bg-[#ebebeb] h-full rounded-lg">
                    <img
                      src="https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/12/27/thuc-pham-tot-cho-tim-1-16406179307891614213387.jpg"
                      alt=""
                      className="w-full h-40 p-2"
                    />
                    <p className="text-gray-700 text-base p-2 hover:text-green-600 cursor-pointer">
                      Một số loại thực phẩm cải thiện mức cholesterol và giúp
                      ngừa bệnh tim
                    </p>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <a>
              <span className="absolute col-span-3 px-3 py-1 bg-green-600 uppercase text-slate-100  hover:text-yellow-400 -translate-y-5 text-sm font-bold top-0 left-3">
                thực phẩm và sức khỏe
              </span>
            </a>
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
