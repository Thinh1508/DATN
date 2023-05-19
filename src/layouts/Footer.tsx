import React from "react"

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className=" bg-[#f1f1f1] sticky top-0 z-[30]">
      <hr className="bg-[#049803] h-1" />
      <div className="container  items-center mx-auto">
        <div className=" w-full max-w-screen-xl  py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0 ml-2 sm:ml-0">
              <a href="/" className="flex items-center">
                <img
                  src="/assets/images/logo3.png"
                  alt="logo"
                  className="object-cover w-12 h-12 inline-block rounded-full"
                />
                <h1 className="text-[#049803] font-bold mx-1 drop-shadow-sm text-xs	sm:text-base">
                  AN TOÀN VỆ SINH THỰC PHẨM <br />
                  THÀNH PHỐ ĐÀ NẴNG
                </h1>
              </a>
            </div>
            <div className="">
              <div className="ml-4 sm:ml-0">
                <h2 className="mb-2 text-sm font-bold text-[#049803] uppercase">
                  Liên hệ
                </h2>
                <ul className="text-gray-600 dark:text-gray-400 font-medium">
                  <li className="mb-1">
                    <a href="" className="hover:underline">
                      Trụ sở: K46/H30/15 Cao Thắng, Thanh Bình, Hải Châu, Đà
                      Nẵng
                    </a>
                  </li>
                  <li>
                    <a href="" className="hover:underline">
                      Điện thoại: 0397989667
                    </a>
                  </li>
                  <li>
                    <a href="" className="hover:underline">
                      Email:Thinhhuynh115@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-green-900 sm:mx-auto dark:border-green-900 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023 Bản quyền thuộc về Huỳnh Văn Thịnh
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
