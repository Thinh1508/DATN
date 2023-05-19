import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { BsList } from "react-icons/bs"
import { IoMdAdd } from "react-icons/io"

type Props = {}

const Header = (props: Props) => {
  const { data: session }: { data: any } = useSession()
  const [showMenu, setShowMenu] = useState(false)
  const [showSubMenu, setShowSubMenu] = useState(false)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 640) {
        setShowMenu(false)
      }
    }

    window.addEventListener("resize", handleResize)
  }, [])

  return (
    <header className=" bg-[#049803] sticky top-0 z-[30]">
      <div className="container items-center mx-auto flex flex-row">
        <div className="relative ml-1 md:ml-0 flex h-[4rem] w-max items-center  basis-11/12 sm:basis-2/6 lg:basis-1/4 mt-1 mb-1">
          <Link href="/" className=" flex items-center">
            <img
              src="/assets/images/logo4.png"
              alt="logo"
              className="object-cover w-16 h-16  md:w-10 md:h-10 xl:w-16 xl:h-16 rounded-full"
            />
            <h1 className="text-white font-bold mx-1 drop-shadow-sm text-base sm:text-xs	xl:text-base ">
              AN TOÀN VỆ SINH THỰC PHẨM <br />
              THÀNH PHỐ ĐÀ NẴNG
            </h1>
          </Link>
        </div>
        <div className="hidden sm:block sm:basis-2/4">
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
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full pl-10 p-1.5 sm:p-2.5 sm:pl-10 focus:"
                placeholder="Search"
                required
              />
            </div>
          </form>
        </div>
        <div className="hidden basis-1/4 sm:basis-1/6 xl:basis-1/4 sm:flex justify-end">
          <h1 className="text-white font-medium px-2 border-r-2 hidden xl:block">
            (+84).397.989.667
          </h1>
          {session ? (
            <div className="relative group">
              <Link href="" className="text-white font-medium  pl-2">
                {session?.user?.name}
              </Link>
              <ul className="absolute bg-white right-0 rounded-md p-2 z-20 text-gray-900 w-32 hidden group-hover:block ">
                <li className="hover:text-green-700 hover:font-medium">
                  <Link href={"/"}>Trang cá nhân</Link>
                </li>
                {session?.user?.permissions === "admin" && (
                  <li className="hover:text-green-700 hover:font-medium">
                    <Link href={"/admin"}>Trang quản lý</Link>
                  </li>
                )}
                <li className="hover:text-green-700 hover:font-medium">
                  <button onClick={() => signOut()} className="cursor-pointer">
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-white font-medium hover:text-gray-300 pl-2"
            >
              Đăng nhập
            </Link>
          )}
        </div>
        <div
          className="flex float-right sm:hidden text-white  cursor-pointer mr-2"
          onClick={() => setShowMenu(!showMenu)}
        >
          <BsList size={30} />
        </div>
      </div>
      <div className="relative hidden sm:flex h-fit w- items-center bg-[#049803] ">
        <div className="container mx-auto">
          <ul className="flex text-[10px] md:text-xs lg:text-sm items-center">
            <li className="flex-none p-1 md:p-2 xl:p-3 text-white font-bold uppercase cursor-pointer hover:bg-[#0cb306] text-center">
              <Link href="/">trang chủ</Link>
            </li>
            <li className="flex-none p-1 md:p-2 xl:p-3 text-white font-bold uppercase cursor-pointer hover:bg-[#0cb306]  text-center">
              giới thiệu
            </li>
            <li className="flex-none p-1 md:p-2 xl:p-3 text-white font-bold uppercase cursor-pointer hover:bg-[#0cb306]  text-center">
              tin tức - sự kiện
            </li>
            <li className="flex-none p-1 md:p-2 xl:p-3 text-white font-bold uppercase cursor-pointer hover:bg-[#0cb306]  text-center">
              hệ thống - văn bản
            </li>
            <li className="flex-none p-1 md:p-2 xl:p-3 text-white font-bold uppercase cursor-pointer hover:bg-[#0cb306]  text-center">
              {session?.user?.permissions === "inspection" ? (
                <Link href={"/atvstp/inspection"}>thanh tra - kiểm tra</Link>
              ) : (
                <Link href={"/inspection"}>thanh tra - kiểm tra</Link>
              )}
            </li>

            <li className="flex-none p-1 md:p-2 xl:p-3 text-white font-bold uppercase cursor-pointer hover:bg-[#0cb306]  text-center relative group">
              <h1>an toàn vệ sinh thực phẩm</h1>
              <ul className="absolute bg-[#0cb306] right-0 capitalize rounded-md p-2 z-10 text-white w-full hidden group-hover:block  ">
                <li className="hover:text-gray-300 hover:font-extrabold my-2">
                  <Link href={"/atvstp/store"}>đăng kí cơ sở kinh doanh</Link>
                </li>
                <li className="hover:text-gray-300 hover:font-extrabold my-2">
                  <Link href={"/atvstp/license"}>đăng kí giấy phép ATVSTP</Link>
                </li>
                <li className="hover:text-gray-300 hover:font-extrabold my-2">
                  <Link href={"/atvstp/report"}>báo cáo cơ sở kinh doanh</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className={`${!showMenu && "hidden"} text-white bg-green-600`}>
        <ul className=" text-sm">
          <li className="p-2 text-white font-bold uppercase cursor-pointer hover:bg-[#0cb306]">
            <Link href="/">trang chủ</Link>
          </li>
          <li className="p-2 text-white font-bold uppercase cursor-pointer hover:bg-[#0cb306]">
            giới thiệu
          </li>
          <li className="p-2 text-white font-bold uppercase cursor-pointer hover:bg-[#0cb306]">
            tin tức - sự kiện
          </li>
          <li className="p-2 text-white font-bold uppercase cursor-pointer hover:bg-[#0cb306]">
            hệ thống - văn bản
          </li>
          <li className=" p-2 text-white font-bold uppercase cursor-pointer hover:bg-[#0cb306]">
            {session?.user?.permissions === "inspection" ? (
              <Link href={"/atvstp/inspection"}>thanh tra - kiểm tra</Link>
            ) : (
              <Link href={"/inspection"}>thanh tra - kiểm tra</Link>
            )}
          </li>

          <li className="flex items-center justify-between p-2 text-white font-bold uppercase cursor-pointer hover:bg-[#0cb306]">
            <h1>an toàn vệ sinh thực phẩm</h1>
            <IoMdAdd size={20} onClick={() => setShowSubMenu(!showSubMenu)} />
          </li>
          <li className="px-2 pb-2 text-white font-bold uppercase">
            <ul
              className={`${
                !showSubMenu && "hidden"
              } capitalize rounded-md px-2 z-10 text-white w-full`}
            >
              <li className="hover:text-gray-300 hover:font-extrabold my-2">
                <Link href={"/atvstp/store"}>đăng kí cơ sở kinh doanh</Link>
              </li>
              <li className="hover:text-gray-300 hover:font-extrabold my-2">
                <Link href={"/atvstp/license"}>đăng kí giấy phép ATVSTP</Link>
              </li>
              <li className="hover:text-gray-300 hover:font-extrabold my-2">
                <Link href={"/atvstp/report"}>báo cáo cơ sở kinh doanh</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
