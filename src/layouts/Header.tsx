import React from "react"

type Props = {}

const Header = (props: Props) => {
  return (
    <header className=" bg-[#049803] sticky top-0 z-[999]">
      <div className="container  items-center mx-auto flex flex-row">
        <div className="relative flex h-[4rem] w-max items-center basis-1/4 mt-1 mb-1">
          <a href="/home" className=" flex items-center">
            <img
              src="https://cdn.haitrieu.com/wp-content/uploads/2022/06/Logo-Thanh-Pho-Da-Nang.png"
              alt="logo"
              className="object-cover w-10 h-10 xl:w-16 xl:h-16"
            />
            <h1 className="text-white font-bold mx-1 drop-shadow-sm	lg:text-base hidden md:block md:text-xs/[8px]">
              AN TOÀN VỆ SINH THỰC PHẨM <br />
              THÀNH PHỐ ĐÀ NẴNG
            </h1>
          </a>
        </div>
        <div className="basis-2/4">
          <form className="flex items-center">
            <label className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  "
                placeholder="Search"
                required
              />
            </div>
          </form>
        </div>
        <div className="basis-1/4 flex justify-end">
          <h1 className="text-white font-medium px-2 border-r-2">
            (+84).236.3.56273
          </h1>
          <a
            href="#"
            className="text-white font-medium hover:text-blue-500 pl-2"
          >
            Login
          </a>
        </div>
      </div>
      <div className="relative flex h-fit w- items-center bg-[#049803] ">
        <div className="container mx-auto">
          <ul className="flex text-sm items-center">
            <li className="flex-none px-3 py-3 text-white font-bold uppercase cursor-pointer bg-[#0cb306] text-center">
              <a href="/">trang chủ</a>
            </li>
            <li className="flex-none px-3 py-3 text-white font-bold uppercase cursor-pointer hover:bg-[#0cb306]  text-center">
              giới thiệu
            </li>
            <li className="flex-none px-3 py-3 text-white font-bold uppercase cursor-pointer hover:bg-[#0cb306]  text-center">
              tin tức - sự kiện
            </li>
            <li className="flex-none px-3 py-3 text-white font-bold uppercase cursor-pointer hover:bg-[#0cb306]  text-center">
              thanh tra - kiểm tra
            </li>
            <li className="flex-none px-3 py-3 text-white font-bold uppercase cursor-pointer hover:bg-[#0cb306]  text-center">
              hệ thống - văn bản
            </li>
            <li className="flex-none px-3 py-3 text-white font-bold uppercase cursor-pointer hover:bg-[#0cb306]  text-center">
              truyền thông
            </li>
            <li className="flex-none px-3 py-3 text-white font-bold uppercase cursor-pointer hover:bg-[#0cb306]  text-center">
              chứng nhận ATTP
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header
