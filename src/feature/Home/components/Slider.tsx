import React from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCreative,
} from "swiper"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import "swiper/css/effect-creative"
import Link from "next/link"
type Props = {}

export function SliderTop(props: Props) {
  
  const listSlider = [
    {
      title: "CHI BỘ BAN QUẢN LÝ AN TOÀN THỰC PHẨM “VỀ QUÊ MẸ” 2023",
      img: "https://antoanthucpham.danang.gov.vn/documents/10181/53698/2803_Thuong_h1.jpg",
    },
    {
      title:
        "BAN QUẢN LÝ AN TOÀN THỰC PHẨM TIẾP TỤC PHÁT TRIỂN CHUỖI CUNG ỨNG THỊT HEO ĐẢM BẢO NGUỒN GỐC VÀ XUẤT XỨ",
      img: "https://antoanthucpham.danang.gov.vn/documents/10181/53698/H2_TXNG.jpg/411d8757-58a3-49da-bbef-99948b6a60ae?t=1679383105698",
    },
    {
      title: "BAN QUẢN LÝ AN TOÀN THỰC PHẨM HƯỞNG ỨNG “TUẦN LỄ ÁO DÀI”",
      img: "https://antoanthucpham.danang.gov.vn/documents/10181/53698/tuan+le+ao+dai_h1.jpg/2bc36080-880f-4cc1-ad79-444929b116ea?t=1677642914239",
    },
    {
      title:
        "ĐÀ NẴNG KIỂM TRA, GIÁM SÁT ĐẢM BẢO AN TOÀN THỰC PHẨM TẾT NGUYÊN ĐÁN QUÝ MÃO NĂM 2023 TRÊN ĐỊA BÀN THÀNH PHỐ",
      img: "https://antoanthucpham.danang.gov.vn/documents/10181/0/09597b9a46929dccc483.jpg/9bdbea52-8670-4ad4-a438-fe2514bdee44?t=1673938201366",
    },
  ]
  const listItems = listSlider.map((slide) => (
    <SwiperSlide>
      <div className="space-y-2">
        <Link
          className="relative text-slate-900 font-bold gap-4 hover:text-green-600 group block"
          href="#"
        >
          <div className="h-[500px]">
            <img
              src={slide.img}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <p className="absolute bottom-0 left-0 right-0 bg-black/70 text-slate-200 font-bold px-4 py-2 uppercase">
            {slide.title}
          </p>
          <div className="absolute inset-0 pointer-events-none group-hover:bg-black/30"></div>
        </Link>
      </div>
    </SwiperSlide>
  )
  )
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Pagination, Navigation]}
    >
      {listItems}
    </Swiper>
  )
}

export function SliderUser(props: Props) {
  const listSlider = [
    {
      title: "Thải độc gan sau Tết với dinh dưỡng lành mạnh",
      img: "https://vfa.gov.vn/storage/upload/23-9400867.jpg",
    },
    {
      title:
        "An toàn thực phẩm cho các bữa tiệc nhiều món lựa chọn(dạng buffet)",
      img: "https://vfa.gov.vn/storage/upload/22-1289129.jpg",
    },
    {
      title:
        "Một số loại thực phẩm cải thiện mức cholesterol và giúp ngừa bệnh tim",
      img: "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/12/27/thuc-pham-tot-cho-tim-1-16406179307891614213387.jpg",
    },
    {
      title: "Lầm tưởng về dinh dưỡng khiến bạn khó giảm cân",
      img: "https://antoanthucpham.danang.gov.vn/documents/10181/0/09597b9a46929dccc483.jpg/9bdbea52-8670-4ad4-a438-fe2514bdee44?t=1673938201366",
    },
  ]
  const listItems = listSlider.map((slide) => (
    <SwiperSlide>
      <div className="min-h-[240px] col-span-3 bg-[#ebebeb] h-full rounded-lg">
        <img src={slide.img} alt="" className="w-full h-40 p-2" />
        <p className="text-gray-700 text-base p-2 hover:text-green-600 cursor-pointer uppercase">
          {slide.title}
        </p>
      </div>
    </SwiperSlide>
  ))
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={10}
      slidesPerView={3}
      navigation
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      className="ml-0 "
    >
      {listItems}
    </Swiper>
  )
}

export function SliderBanner(props: Props) {
  const listSlider = [
    "https://danahomeland.vn/uploads/media_gal/43-0banner-tc.jpg",
    "https://danahomeland.vn/uploads/media_gal/43-0banner-tc.jpg",
    "https://danahomeland.vn/uploads/media_gal/43-0banner-tc.jpg",
    "https://danahomeland.vn/uploads/media_gal/43-0banner-tc.jpg",
    "https://danahomeland.vn/uploads/media_gal/43-0banner-tc.jpg",
    "https://danahomeland.vn/uploads/media_gal/43-0banner-tc.jpg",
    "https://danahomeland.vn/uploads/media_gal/43-0banner-tc.jpg",
    "https://danahomeland.vn/uploads/media_gal/43-0banner-tc.jpg",
  ]
  const listItems = listSlider.map((slide) => (
    <SwiperSlide>
      <img
        src={slide}
        alt="thông điệp"
        className="w-full max-h-[200px] rounded-md"
      />
    </SwiperSlide>
  ))
  return (
    <Swiper
      grabCursor={true}
      effect={"creative"}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      }}
      modules={[EffectCreative]}
    >
      {listItems}
    </Swiper>
  )
}
