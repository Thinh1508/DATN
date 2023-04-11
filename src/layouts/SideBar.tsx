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
  return (
    <div className="sticky mt-2 hidden lg:col-span-3 lg:block space-y-2 h-fit pb-20">
      <div>
        <div className="flex mb-2">
          <a href="#">
            <h1 className="font-bold text-slate-900 hover:text-green-600 border-b-[3px] border-green-600 uppercase">
              Danh mục
            </h1>
          </a>
          <div className="flex-1 border-b-[3px] border-slate-900/40"></div>
        </div>

        <ul className="max-w-md divide-y divide-green-200 dark:divide-green-600 p2">
          <li className="p-2 ">
            <div className=" flex items-center space-x-4">
              <div className="flex-shrink-0">
                <FaCalendar className="text-green-600 w-5 h-5 " />
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-black">
                <p className="text-base font-medium text-lg text-green-600 truncate dark:text-gr cursor-pointer uppercase hover:text-red-600">
                  Lịch thanh kiểm tra
                </p>
              </div>
            </div>
          </li>
          <li className="p-2 ">
            <div className=" flex items-center space-x-4">
              <div className="flex-shrink-0">
                <FaRegCalendarTimes className="text-green-600 w-5 h-5 " />
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-black">
                <p className="text-base font-medium text-lg text-green-600 truncate dark:text-gr cursor-pointer uppercase hover:text-red-600">
                  Báo cáo vi phạm
                </p>
              </div>
            </div>
          </li>
          <li className="p-2 ">
            <div className=" flex items-center space-x-4">
              <div className="flex-shrink-0">
                <FaPenSquare className="text-green-600 w-5 h-5 " />
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-black">
                <p className="text-base font-medium text-lg text-green-600 truncate dark:text-gr cursor-pointer uppercase hover:text-red-600">
                  Dự thảo góp ý
                </p>
              </div>
            </div>
          </li>
          <li className="p-2 ">
            <div className=" flex items-center space-x-4">
              <div className="flex-shrink-0">
                <FaComment className="text-green-600 w-5 h-5 " />
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-black">
                <p className="text-base font-medium text-lg text-green-600 truncate dark:text-gr cursor-pointer uppercase hover:text-red-600">
                  hỏi đáp
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <div className="flex mb-2">
          <a href="#">
            <h1 className="font-bold text-slate-900 hover:text-green-600 border-b-[3px] border-green-600">
              VĂN BẢN MỚI BAN HÀNH
            </h1>
          </a>
          <div className="flex-1 border-b-[3px] border-slate-900/40"></div>
        </div>
        <div className="space-y-2 overflow-x-auto max-h-64">
          <a
            className="text-green-600 font-bold flex gap-1 mb-2 hover:text-red-600 text-sm"
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
              Thông tư số 19/2022/TT-BNNPTNT ngày 02/12/2022 Thông tư Ban hành
              Danh mục thuốc bảo vệ thực vật được phép sử dụng tại Việt Nam và
              Danh mục thuốc bảo vệ thực vật cấm sử dụng tại Việt Nam
            </p>
          </a>
          <a
            className="text-green-600 font-bold flex gap-1 mb-2 hover:text-red-600 text-sm"
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
              Nghị quyết Về thí điểm tổ chức mô hình chính quyền đô thị và một
              số cơ chế, chính sách đặc thù phát triển thành phố Đà Nẵng
            </p>
          </a>
          <a
            className="text-green-600 font-bold flex gap-1 mb-2 hover:text-red-600 text-sm"
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
              Quy định chế độ báo cáo và biểu mẫu cáo cáo về an toàn thực phẩm
              thuộc phạm vi quản lý của ngành y tế
            </p>
          </a>
          <a
            className="text-green-600 font-bold flex gap-1 mb-2 hover:text-red-600 text-sm"
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
              Sửa đổi, bổ sung một số điều của Thông tư số 279/2016/TT-BTC ngày
              14 tháng 11 năm 2016 của Bộ trưởng Bộ Tài chính quy định mức thu,
              chế độ thu, nộp, quản lý và sử dụng phí trong công tác an toàn vệ
              sinh thực phẩm (hết hiệu lực)
            </p>
          </a>
          <a
            className="text-green-600 font-bold flex gap-1 mb-2 hover:text-red-600 text-sm"
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
              Chỉ thị của Ban Bí thư về tăng cường bảo đảm an ninh, an toàn thực
              phẩm trong tình hình mới
            </p>
          </a>
          <a
            className="text-green-600 font-bold flex gap-1 mb-2 hover:text-red-600 text-sm"
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
              Sửa đổi, bổ sung một số điều của Thông tư số 279/2016/TT-BTC ngày
              14 tháng 11 năm 2016 của Bộ trưởng Bộ Tài chính quy định mức thu,
              chế độ thu, nộp, quản lý và sử dụng phí trong công tác an toàn vệ
              sinh thực phẩm (hết hiệu lực)
            </p>
          </a>
          <a
            className="text-green-600 font-bold flex gap-1 mb-2 hover:text-red-600 text-sm"
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
              Chỉ thị của Ban Bí thư về tăng cường bảo đảm an ninh, an toàn thực
              phẩm trong tình hình mới
            </p>
          </a>
        </div>
      </div>

      <div>
        <div className="flex mb-4 mt-6">
          <h1 className="font-bold text-slate-900 border-b-[3px] border-green-600">
            BANNER LIÊN KẾT
          </h1>
          <div className="flex-1 border-b-[3px] border-slate-900/40"></div>
        </div>
        <div className="space-y-2">
          <a className="block" href="/bantinattp">
            <img
              src="https://antoanthucpham.danang.gov.vn/documents/10181/10940/a-min.jpg?t=1560500879407"
              alt=""
              className="w-full"
            />
          </a>
          <a className="block" href="/bantinattp">
            <img
              src="https://antoanthucpham.danang.gov.vn/documents/10181/10940/d-min.jpg?t=1560500879407"
              alt=""
              className="w-full"
            />
          </a>
          <a className="block" href="/bantinattp">
            <img
              src="https://antoanthucpham.danang.gov.vn/documents/10181/10940/ddn-min.png?t=1560500879408"
              alt=""
              className="w-full"
            />
          </a>
        </div>
      </div>

      <div>
        <div className="flex mb-4 mt-6">
          <h1 className="font-bold text-slate-900 border-b-[3px] border-green-600 ">
            TỔNG LƯỢC TRUY CẬP{" "}
          </h1>
          <div className="flex-1 border-b-[3px] border-slate-900/40"></div>
        </div>
        <div className="flex justify-between">
          <h1 className="text-slate-900 font-normal border-slate-900 px-2">
            Tổng lượng truy cập
          </h1>
          <p className="text-slate-900 font-normal border-slate-900 px-2">1</p>
        </div>
      </div>
    </div>
  )
}

export default SideBar
