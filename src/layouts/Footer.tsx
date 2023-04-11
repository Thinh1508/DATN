import React from "react"

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className=" bg-[#f1f1f1] sticky top-0 z-[999]">
      <hr className="bg-[#049803] h-1" />
      <div className="container  items-center mx-auto">
        <div className=" w-full max-w-screen-xl  py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="/" className="flex items-center">
                <img
                  src="https://cdn.haitrieu.com/wp-content/uploads/2022/06/Logo-Thanh-Pho-Da-Nang.png"
                  alt="logo"
                  className="object-cover w-12 h-12 inline-block"
                />
                <h1 className="text-black font-bold mx-1 drop-shadow-sm	text-base">
                  AN TOÀN VỆ SINH THỰC PHẨM <br />
                  THÀNH PHỐ ĐÀ NẴNG
                </h1>
              </a>
            </div>
            <div className="">
              <div>
                <h2 className="mb-2 text-sm font-semibold text-gray-900 uppercase dark:text-green-500">
                  Liên hệ
                </h2>
                <ul className="text-gray-600 dark:text-gray-400 font-medium">
                  <li className="mb-1">
                    <a href="" className="hover:underline">
                      Trụ sở: 12 Bạch Đằng, phường Thạch Thang, quận Hải Châu,
                      thành phố Đà Nẵng
                    </a>
                  </li>
                  <li>
                    <a href="" className="hover:underline">
                      Điện thoại: 84.236.3.562731
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023{" "}
              <a href="https://flowbite.com/" className="hover:underline">
                Flowbite™
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
