import Link from "next/link"
import React from "react"
import {
  FaCalendar,
  FaFacebookMessenger,
  FaPenSquare,
  FaRegCalendarTimes,
  FaComment,
} from "react-icons/fa"

type Props = {}

const SideBar = (props: Props) => {
  const documents = [
    {
      title:
        "Thông tư số 19/2022/TT-BNNPTNT ngày 02/12/2022 Thông tư Ban hành Danh mục thuốc bảo vệ thực vật được phép sử dụng tại Việt Nam và Danh mục thuốc bảo vệ thực vật cấm sử dụng tại Việt Nam",
      img: "",
    },
    {
      title:
        "Chỉ thị của Ban Bí thư về tăng cường bảo đảm an ninh, an toàn thực phẩm trong tình hình mới",
      img: "",
    },
    {
      title:
        "Thông tư quy định mức thu, chế độ thu, nộp, quản lý và sử dụng phí trong công tác an toàn thực phẩm",
      img: "",
    },
    {
      title:
        "Sửa đổi, bổ sung một số điều của Thông tư số 279/2016/TT-BTC ngày 14 tháng 11 năm 2016 của Bộ trưởng Bộ Tài chính quy định mức thu, chế độ thu, nộp, quản lý và sử dụng phí trong công tác an toàn vệ sinh thực phẩm (hết hiệu lực)",
      img: "",
    },
    {
      title:
        "Quy định chế độ báo cáo và biểu mẫu cáo cáo về an toàn thực phẩm thuộc phạm vi quản lý của ngành y tế",
      img: "",
    },
    {
      title:
        "Nghị quyết Về thí điểm tổ chức mô hình chính quyền đô thị và một số cơ chế, chính sách đặc thù phát triển thành phố Đà Nẵng",
      img: "",
    },
    {
      title:
        "Nghị định quy định quản lý đầu tư ứng dụng CNTT sử dụng ngân sách nhà nước",
      img: "",
    },
    {
      title:
        "Nghị định quy định chi tiết một số điều của Luật An toàn thực phẩm",
      img: "",
    },
  ]
  const banners = [
    {
      link: "https://dichvucong.danang.gov.vn/thu-tuc-hanh-chinh",
      img: "https://antoanthucpham.danang.gov.vn/documents/10181/10940/a-min.jpg?t=1560500879407",
    },
    {
      link: "https://dichvucong.danang.gov.vn/",
      img: "https://antoanthucpham.danang.gov.vn/documents/10181/10940/d-min.jpg?t=1560500879407",
    },
    {
      link: "/",
      img: "https://antoanthucpham.danang.gov.vn/documents/10181/10940/a-min.jpg?t=1560500879407",
    },
  ]

  return (
    <div className="sticky mt-2 hidden lg:col-span-3 lg:block space-y-2 h-fit pb-20">
      <div>
        <div className="flex mb-2">
          <Link href="#">
            {/* <h1 className="font-bold text-slate-900 hover:text-green-600 border-b-[3px] border-green-600 uppercase">
              Danh mục
            </h1> */}
          </Link>
          <div className="flex-1 border-b-[3px] border-slate-900/40"></div>
        </div>

        <ul className="max-w-md divide-y divide-green-200 dark:divide-green-600 p2">
          <li className="p-2 ">
            <Link
              href={"/"}
              className=" flex items-center space-x-4 text-green-600 hover:text-green-800"
            >
              <div className="flex-shrink-0">
                <FaCalendar className=" w-5 h-5 " />
              </div>
              <div className="inline-flex items-center text-base font-semibold ">
                <p className="font-medium text-lg  truncate dark:text-gr cursor-pointer uppercase ">
                  Lịch thanh kiểm tra
                </p>
              </div>
            </Link>
          </li>
          <li className="p-2 ">
            <Link
              href={"/atvstp/report"}
              className=" flex items-center space-x-4 text-green-600 hover:text-green-800"
            >
              <div className="flex-shrink-0">
                <FaRegCalendarTimes className=" w-5 h-5 " />
              </div>
              <div className="inline-flex items-center text-base font-semibold">
                <p className="font-medium text-lg  truncate dark:text-gr cursor-pointer uppercase">
                  Báo cáo vi phạm
                </p>
              </div>
            </Link>
          </li>
          <li className="p-2 ">
            <Link
              href={"/"}
              className=" flex items-center space-x-4 text-green-600 hover:text-green-800"
            >
              <div className="flex-shrink-0">
                <FaPenSquare className=" w-5 h-5 " />
              </div>
              <div className="inline-flex items-center text-base font-semibold ">
                <p className="font-medium text-lg  truncate dark:text-gr cursor-pointer uppercase ">
                  Dự thảo góp ý
                </p>
              </div>
            </Link>
          </li>
          <li className="p-2 ">
            <Link
              href={"/"}
              className=" flex items-center space-x-4 text-green-600 hover:text-green-800"
            >
              <div className="flex-shrink-0">
                <FaComment className=" w-5 h-5 " />
              </div>
              <div className="inline-flex items-center text-base font-semibold ">
                <p className="font-medium text-lg  truncate dark:text-gr cursor-pointer uppercase ">
                  hỏi đáp
                </p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <div className="flex mb-2">
          <Link href="#">
            <h1 className="font-bold text-slate-900 hover:text-green-600 border-b-[3px] border-green-600">
              VĂN BẢN MỚI BAN HÀNH
            </h1>
          </Link>
          <div className="flex-1 border-b-[3px] border-slate-900/40"></div>
        </div>
        <div className="space-y-2 overflow-x-auto max-h-64 scrollbar-style">
          {documents.map((document, index) => (
            <Link
              className="text-green-600 font-bold flex gap-1 mb-2 hover:text-green-800 text-sm"
              href=""
              key={index}
            >
              <div className="h-3 w-3 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  fill="currentColor"
                >
                  <path d="M246.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L178.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C47.63 444.9 55.81 448 64 448s16.38-3.125 22.62-9.375l160-160C259.1 266.1 259.1 245.9 246.6 233.4zM438.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L370.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C239.6 444.9 247.8 448 256 448s16.38-3.125 22.62-9.375l160-160C451.1 266.1 451.1 245.9 438.6 233.4z" />
                </svg>
              </div>
              <p className="flex-1 font-normal">{document.title}</p>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <div className="flex mb-4 mt-6">
          <h1 className="font-bold text-slate-900 border-b-[3px] border-green-600 uppercase">
            Trang LIÊN KẾT
          </h1>
          <div className="flex-1 border-b-[3px] border-slate-900/40"></div>
        </div>
        <div className="space-y-2">
          {banners.map((banner, index) => (
            <Link
              className="block"
              href={banner.link}
              key={index}
              target="_blank"
            >
              <img src={banner.img} alt="" className="w-full" />
            </Link>
          ))}
        </div>
      </div>

      <div>
        <div className="flex mb-4 mt-6">
          <h1 className="font-bold text-slate-900 border-b-[3px] border-green-600 uppercase">
            TỔNG LƯỢT TRUY CẬP
          </h1>
          <div className="flex-1 border-b-[3px] border-slate-900/40"></div>
        </div>
        <div className="flex justify-between">
          <h1 className="text-slate-900 font-normal border-slate-900 px-2">
            Tổng lượt truy cập
          </h1>
          <p className="text-slate-900 font-normal border-slate-900 px-2">1</p>
        </div>
      </div>
    </div>
  )
}

export default SideBar
