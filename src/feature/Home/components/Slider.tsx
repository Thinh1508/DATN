import React, { useEffect, useState } from "react"

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
type Props = {
  data: any
  idPost: string
}

export function SliderTop({ data }: Props) {
  const listSlider = data
  const listItems = listSlider.map((slide: any) => (
    <SwiperSlide key={slide._id}>
      <div className="space-y-2 shadow-xl">
        <Link
          className="relative text-slate-900 font-bold gap-4 hover:text-green-600 group block"
          href={{
            pathname: "/postDetail",
            query: {
              idPost: slide._id,
              category: slide.category,
            },
          }}
        >
          <div className="h-[500px]">
            <img
              src={slide.background}
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
  ))
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

export function SliderUser({ data }: Props) {
  const listSlider = data
  const listItems = listSlider.map((slide: any) => (
    <SwiperSlide key={slide._id}>
      <Link
        className="min-h-[240px] col-span-3 bg-[#ebebeb] h-full rounded-lg"
        href={{
          pathname: "/postDetail",
          query: {
            idPost: slide._id,
            category: slide.category,
          },
        }}
      >
        <img src={slide.background} alt="" className="w-full h-40 p-2" />
        <p className="text-gray-700 text-base p-2 hover:text-green-600 cursor-pointer uppercase">
          {slide.title}
        </p>
      </Link>
    </SwiperSlide>
  ))
  const [perView, setPerView] = useState(3)
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 769 && window.innerWidth > 370) {
        setPerView(2)
      } else {
        if (window.innerWidth < 370) {
          setPerView(1)
        } else {
          setPerView(3)
        }
      }
    }

    window.addEventListener("resize", handleResize)
  }, [])
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={10}
      slidesPerView={perView}
      navigation
      className="ml-0 "
    >
      {listItems}
    </Swiper>
  )
}

export function SliderBanner(props: Props) {
  const listSlider = [
    {
      id: 1,
      img: "https://danang-shopping.com/wp-content/uploads/2019/07/banner-website-cau-rong.jpg",
    },
    {
      id: 2,
      img: "https://media.thuonghieucongluan.vn/uploads/2019_01_24/2-1548283845.jpg",
    },
  ]
  const listItems = listSlider.map((slide) => (
    <SwiperSlide key={slide.id}>
      <img
        src={slide.img}
        alt="thông điệp"
        className="w-full max-h-[200px]  shadow-xl"
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

export function SliderSame({ data, idPost }: Props) {
  const listSlider = data.filter((slide: any) => slide._id !== idPost)
  const listItems = listSlider.map((slide: any) => (
    <SwiperSlide key={slide._id}>
      <Link
        className="min-h-[240px] col-span-3 bg-[#ebebeb] h-full "
        href={{
          pathname: "/postDetail",
          query: {
            idPost: slide._id,
            category: slide.category,
          },
        }}
      >
        <img src={slide.background} alt="" className="w-full h-40 p-2" />
        <p className="text-gray-700 text-base p-2 hover:text-green-600 cursor-pointer uppercase">
          {slide.title}
        </p>
      </Link>
    </SwiperSlide>
  ))
  const [perView, setPerView] = useState(3)
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 769 && window.innerWidth > 370) {
        setPerView(2)
      } else {
        if (window.innerWidth < 370) {
          setPerView(1)
        } else {
          setPerView(3)
        }
      }
    }

    window.addEventListener("resize", handleResize)
  }, [])
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={10}
      slidesPerView={perView}
      navigation
      className="ml-0 "
    >
      {listItems}
    </Swiper>
  )
}
