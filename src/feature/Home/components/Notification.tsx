import { count } from "console"
import React from "react"
import Link from "next/link"

type Props = {}

const Notification = (props: Props) => {
  const listNoti = [
    {
      id: 0,
      title: "HOÀ VANG TRIỂN KHAI HƯỚNG DẪN HỆ THỐNG TXNG TRÊN ĐỊA BÀN CÁC XÃ",
      img: "https://antoanthucpham.danang.gov.vn/documents/10181/45038/Nhanh_1011_h3.jpg/ed8251b4-a7d9-40cb-820f-bb7a7dfa89c4?t=1668062075138",
    },
    {
      id: 1,
      title:
        "KHAI GIẢNG LỚP BỒI DƯỠNG NGHIỆP VỤ THANH TRA CHUYÊN NGÀNH AN TOÀN THỰC PHẨM",
      img: "",
    },
    {
      id: 2,
      title:
        "TUYÊN TRUYỀN, TẬP HUẤN NÂNG CAO KIẾN THỨC VỀ AN TOÀN THỰC PHẨM CHO CÁN BỘ CÔNG ĐOÀN CƠ SỞ THUỘC LIÊN ĐOÀN LAO ĐỘNG THÀNH PHỐ ĐÀ NẴNG",
      img: "",
    },
    {
      id: 3,
      title:
        "TỔ CHỨC THÀNH CÔNG HỘI THI TÌM HIỂU KIẾN THỨC AN TOÀN THỰC PHẨM NĂM 2023",
      img: "",
    },
    {
      id: 4,
      title:
        "GIÁM SÁT VIỆC LƯU HÀNH SẢN PHẨM THỰC PHẨM BẢO VỆ SỨC KHỎE XTRA MAN",
      img: "",
    },
    {
      id: 5,
      title:
        "TIẾP TỤC THỰC HIỆN NGHỊ ĐỊNH 09/2016/NĐ-CP TĂNG CƯỜNG VI CHẤT DINH DƯỠNG VÀO THỰC PHẨM",
      img: "",
    },
    {
      id: 6,
      title:
        "MỜI BÁO GIÁ DỊCH VỤ THUÊ MÁY CHỦ ẢO HOSTING CSDL VÀ PHẦN MỀM QLNN CHUYÊN NGÀNH AN TOÀN THỰC PHẨM",
      img: "",
    },
    {
      id: 7,
      title:
        "KẾT QUẢ XÉT TUYỂN VIÊN CHỨC TRUNG TÂM KIỂM NGHIỆM THỰC PHẨM CHUYÊN SÂU TRỰC THUỘC BAN QUẢN LÝ AN TOÀN THỰC PHẨM THÀNH PHỐ ĐÀ NẴNG NĂM 2022",
      img: "",
    },
  ]
  const renderList = listNoti.map((noti) => (
    <li key={noti.id}>
      <Link
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
        <p className="flex-1 font-normal">{noti.title}</p>
      </Link>
    </li>
  ))
  return (
    <div className="relative min-h-[250px] border-[1px] rounded-lg border-slate-400 !mt-10">
      <div className="flex h-full p-4 gap-6">
        <a className="h-full w-[350px] block" href="#">
          <img
            src={listNoti[0].img}
            alt=""
            className="w-full max-h-[350px] object-cover"
          />
        </a>
        <div className="flex-1 space-y-2">
          <a
            className="text-slate-900 font-bold block gap-4 hover:text-green-600 border-b-[1px] border-slate-900 pb-2 !mb-5"
            href="#"
          >
            <p className="flex-1 text-green-600">{listNoti[0].title}</p>
          </a>
          <ul>{renderList}</ul>
        </div>
      </div>
      <a href="#">
        <span className="absolute col-span-3 px-3 py-1 bg-green-600 uppercase text-slate-100  hover:text-yellow-400 -translate-y-5 text-sm font-bold top-0 left-3">
          thông báo
        </span>
      </a>
    </div>
  )
}

export default Notification
