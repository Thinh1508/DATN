import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

import { RiAlertFill } from "react-icons/ri"
import { FaThList } from "react-icons/fa"
import {
  BsArrowLeftShort,
  BsSearch,
  BsPerson,
  BsPersonLinesFill,
  BsPostcardFill,
} from "react-icons/bs"
import {
  AiOutlineBarChart,
  AiOutlineSetting,
  AiOutlineLogout,
  AiFillFileText,
  AiFillReconciliation,
} from "react-icons/ai"
import { useSession, signOut } from "next-auth/react"

const Menus = [
  { title: "Thống kê", link: "/admin" },
  {
    title: "Tài khoản",
    icon: <BsPersonLinesFill />,
    spacing: true,
    link: "/admin/account",
  },
  { title: "Danh mục", icon: <FaThList />, link: "/admin/category" },
  { title: "Bài viết", icon: <BsPostcardFill />, link: "/admin/post" },
  { title: "Văn bản", icon: <AiFillFileText />, link: "/admin/document" },
  {
    title: "Thanh tra",
    icon: <AiFillReconciliation />,
    // submenu: true,
    // submenuItems: [
    //   { title: "submenu 1" },
    //   { title: "submenu 2" },
    //   { title: "submenu 3" },
    // ],
    link: "/admin/inspection",
  },
  { title: "Báo cáo", icon: <RiAlertFill />, link: "/admin/report" },
  {
    title: "Trang cá nhân",
    icon: <BsPerson />,
    spacing: true,
    link: "/admin/profile",
  },
  { title: "Cài đặt", icon: <AiOutlineSetting />, link: "/admin/setting" },
  // { title: "Đăng xuất", icon: <AiOutlineLogout />, link: "/admin/logout" },
]

type Props = {}

const SideBar = (props: Props) => {
  const [open, setOpen] = useState(true)
  const { data: session }: { data: any } = useSession()

  const { pathname } = useRouter()

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1280) {
        setOpen(false)
      } else {
        setOpen(true)
      }
    }

    window.addEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={`bg-dark-green h-screen p-5 pt-8 ${
        open ? "w-72 absolute z-10" : "w-20 relative"
      } duration-300 sm:relative`}
    >
      <BsArrowLeftShort
        className={`bg-white text-dark-green text-3xl rounded-full absolute -right-3 top-9 
      border-dark-green cursor-pointer ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />

      <div className="inline-flex items-center">
        <img
          src="/assets/images/logo4.png"
          className={`h-9 w-9 text-4xl rounded-full cursor-pointer block float-left mr-2 duration-500 ${
            !open && "rotate-[360deg]"
          }`}
        />
        <Link
          href={"/"}
          className={`text-white origin-left font-medium sm:text-2xl text-base duration-300 cursor-pointer ${
            !open && "scale-0"
          }`}
        >
          DaNangFA
        </Link>
      </div>

      <div
        className={`flex items-center rounded-md bg-light-while mt-6 ${
          open ? "px-4" : "px-2.5"
        } py-2`}
      >
        <BsSearch
          className={`text-white text-lg block float-left cursor-pointer ${
            open && "mr-2"
          }`}
        />
        <input
          type={"search"}
          placeholder="Search"
          className={`text-base bg-transparent w-full text-white
        focus:outline-none ${!open && "hidden"}`}
        />
      </div>

      <ul className="pt-2">
        {Menus.map((menu) => (
          <Link href={menu.link} className="relative" key={menu.title}>
            <li
              className={`text-gray-200 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-700 rounded-md ${
                menu.spacing ? "mt-9 after:h-[53%]" : "mt-2 after:h-[83%]"
              }
                 ${
                   pathname === menu.link &&
                   "bg-green-700 after:absolute after:-left-5 after:bg-green-700 after:w-1.5 after:rounded-lg after:transition-all"
                 } `}
              // onClick={() => {
              //   if (menu.submenuItems) {
              //     setSubmenuOpen(!submenuOpen)
              //   }
              // }}
            >
              <span className="text-2xl block float-left">
                {menu.icon ? menu.icon : <AiOutlineBarChart />}
              </span>
              <span
                className={`text-base capitalize font-medium flex-1 ${
                  !open && "hidden"
                } duration-300`}
              >
                {menu.title}
              </span>
              {/* {menu.submenu && open && (
                  <BsChevronDown className={`${submenuOpen && "rotate-180"}`} />
                )} */}
            </li>
            {/* {menu.submenu && submenuOpen && open && (
                <ul>
                  {menu.submenuItems.map((submenuItem, index) => (
                    <li
                      key={index}
                      className="text-gray-200 text-sm flex item-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-while rounded-md"
                    >
                      {submenuItem.title}
                    </li>
                  ))}
                </ul>
              )} */}
          </Link>
        ))}
        <li
          className={`text-gray-200 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-700 rounded-md 
                  `}
          onClick={() => signOut()}
        >
          <span className="text-2xl block float-left">
            <AiOutlineLogout />
          </span>
          <span
            className={`text-base capitalize font-medium flex-1 ${
              !open && "hidden"
            } duration-300`}
          >
            Đăng xuất
          </span>
        </li>
      </ul>
    </div>
  )
}

export default SideBar
