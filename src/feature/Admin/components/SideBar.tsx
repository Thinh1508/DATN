import { useState } from "react"

import { RiAlertFill } from "react-icons/ri"
import {
  BsArrowLeftShort,
  BsSearch,
  BsChevronDown,
  BsPerson,
  BsPersonLinesFill,
  BsCardImage,
  BsPostcardFill,
} from "react-icons/bs"
import {
  AiOutlineBarChart,
  AiOutlineSetting,
  AiOutlineLogout,
  AiFillFileText,
  AiFillReconciliation,
} from "react-icons/ai"
import Link from "next/link"

type Props = {}

const SideBar = (props: Props) => {
  const [open, setOpen] = useState(false)
  const [submenuOpen, setSubmenuOpen] = useState(true)

  const Menus = [
    { title: "statistical" },
    { title: "account", icon: <BsPersonLinesFill />, spacing: true },
    {
      title: "inspection",
      icon: <AiFillReconciliation />,
      // submenu: true,
      // submenuItems: [
      //   { title: "submenu 1" },
      //   { title: "submenu 2" },
      //   { title: "submenu 3" },
      // ],
    },
    { title: "post", icon: <BsPostcardFill /> },
    { title: "media", icon: <BsCardImage /> },
    { title: "document", icon: <AiFillFileText /> },
    { title: "reports", icon: <RiAlertFill /> },
    { title: "profile", icon: <BsPerson />, spacing: true },
    { title: "setting", icon: <AiOutlineSetting /> },
    { title: "logout", icon: <AiOutlineLogout /> },
  ]

  return (
    <div
      className={`bg-dark-green h-screen p-5 pt-8 ${
        open ? "w-72 " : "w-20"
      } duration-300 relative `}
    >
      <BsArrowLeftShort
        className={`bg-white text-dark-green text-3xl rounded-full absolute -right-3 top-9 
      border-dark-green cursor-pointer ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />

      <div className="inline-flex">
        <img
          src="/assets/images/logo3.png"
          className={`h-9 w-9 text-4xl rounded-full cursor-pointer block float-left mr-2 duration-500 ${
            !open && "rotate-[360deg]"
          }`}
        />
        <h1
          className={`text-white origin-left font-medium text-2xl duration-300 ${
            !open && "scale-0"
          }`}
        >
          DaNangFA
        </h1>
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
        {Menus.map((menu, index) => (
          <>
            <Link
              href={`/admin/${menu.title === "statistical" ? "" : menu.title}`}
            >
              <li
                key={index}
                className={`text-gray-200 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-while rounded-md ${
                  menu.spacing ? "mt-9" : "mt-2"
                }`}
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
            </Link>
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
          </>
        ))}
      </ul>
    </div>
  )
}

export default SideBar
