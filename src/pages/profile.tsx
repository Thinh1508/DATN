import Link from "next/link"
import React from "react"
import {
  AiFillClockCircle,
  AiFillEdit,
  AiFillHome,
  AiOutlineEdit,
} from "react-icons/ai"
import { BsList } from "react-icons/bs"
import { FaBirthdayCake, FaTransgender } from "react-icons/fa"
import { IoIosFiling, IoMdMail } from "react-icons/io"
import { RiDashboardFill } from "react-icons/ri"

type Props = {}

const ProfilePage = (props: Props) => {
  return (
    <div className="flex-1 bg-white text-gray-950">
      <div className="h-64 bg-slate-100">
        <div className="container mx-auto h-full">
          <div className="h-[75%]  rounded-b-md bg-white shadow-md">
            {/* <img
              src="https://haycafe.vn/wp-content/uploads/2022/03/background-banner-mau-hong-chuc-mung.jpg"
              alt="image"
              className="w-full h-full object-cover rounded-b-md"
            /> */}
          </div>
          <div className="flex items-center justify-between h-[25%] ml-20">
            <div className="flex items-center">
              <img
                src="https://c3kienthuyhp.edu.vn/wp-content/uploads/2022/12/999-Anh-Gai-Xinh-Viet-Nam-Hot-Girl-Cute-De.jpg"
                alt=""
                className=" rounded-full w-28 h-28 -translate-y-7 border-2 border-slate-100"
              />
              <h1 className="ml-2 font-bold text-xl text-green-900">
                Thịnh Huỳnh
              </h1>
            </div>
            <div className="mr-20">
              <button className="bg-green-900 rounded-lg p-2 text-white text-base flex gap-3 items-center transition duration-100 ease-in-out hover:-translate-y-1 hover:scale-105">
                <AiOutlineEdit size={20} />
                <span>Chỉnh sửa trang cá nhân</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto h-full mt-4 flex gap-4">
        <div className="w-[30%] bg-slate-100 p-4 rounded-md h-fit shadow-md">
          <h1 className="font-bold text-xl text-green-900 mb-2">Giới thiệu</h1>
          <hr />
          <ul className="mt-4">
            <li className="mt-3 flex items-center gap-2">
              <IoMdMail size={18} />
              <span>
                Email{" "}
                <span className="font-medium">thinhhuynh115@gmail.com</span>
              </span>
            </li>
            <li className="mt-3 flex items-center gap-2">
              <AiFillHome size={18} />
              <span>
                Sống tại{" "}
                <span className="font-medium">
                  117 Lý Tự Trọng, Thanh Bình, Hải Châu
                </span>
              </span>
            </li>
            <li className="mt-3 flex items-center gap-2">
              <FaBirthdayCake size={18} />
              <span>
                Ngày sinh <span className="font-medium">10/11/2001</span>
              </span>
            </li>
            <li className="mt-3 flex items-center gap-2">
              <FaTransgender size={18} />
              <span>
                Giới tính <span className="font-medium">Nam</span>
              </span>
            </li>
            <li className="mt-3 flex items-center gap-2">
              <AiFillClockCircle size={18} />
              <span>
                Tham gia vào{" "}
                <span className="font-medium">Tháng 5 năm 2023</span>
              </span>
            </li>
          </ul>
        </div>
        <div className="w-[70%] h-fit">
          <div className=" flex bg-slate-100 p-4 rounded-md items-center justify-between shadow-md">
            <h1 className="font-bold text-xl text-green-900">Cửa hàng</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 font-semibold text-green-700 border-b-2 border-b-green-700">
                <BsList size={18} />
                <h1>Xem theo danh sách</h1>
              </div>
              <div className="flex items-center gap-1 font-semibold text-gray-700">
                <RiDashboardFill size={18} />
                <h1>Chế độ xem lưới</h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mt-4">
            <h1 className="font-bold text-2xl">Bạn chưa có cửa hàng nào</h1>
            <Link
              href="/atvstp/store"
              className="mt-2 px-4 py-2 bg-green-900 text-white rounded hover:bg-green-600"
            >
              Đăng kí ngay
            </Link>
          </div>
          {/* <div className=" bg-slate-100 rounded-md my-4 shadow-md relative">
            <img
              src="https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/lentkdau/mauthietkenhahangdep/13.jpg"
              alt=""
              className="w-full h-full  rounded-t-md"
            />
            <p className="absolute top-0 left-0 right-0 bg-black/70 text-slate-200 font-bold px-4 py-2 uppercase rounded-t-md">
              Quán ăn pro
            </p>
            <div className="flex items-center justify-around h-10">
              <button className="font-semibold px-20 py-1 text-gray-600 hover:bg-gray-300 flex items-center gap-1">
                <IoIosFiling size={18} />
                Xem thông tin chi tiết
              </button>
              <button className="font-semibold px-20 py-1 text-gray-600 hover:bg-gray-300 flex items-center gap-1">
                <AiFillEdit size={18} />
                Chỉnh sửa thông tin
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
