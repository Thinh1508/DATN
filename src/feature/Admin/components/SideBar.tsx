import { useState } from "react"

import {
  BsArrowLeftShort,
  BsSearch,
  BsChevronDown,
  BsPerson,
  BsReverseLayoutTextSidebarReverse,
  BsCardImage,
} from "react-icons/bs"
import { RiDashboardFill } from "react-icons/ri"
import {
  AiOutlineFileText,
  AiOutlineBarChart,
  AiOutlineMail,
  AiOutlineSetting,
  AiOutlineLogout,
} from "react-icons/ai"

type Props = {}

const SideBar = (props: Props) => {
  const [open, setOpen] = useState(false)
  const [submenuOpen, setSubmenuOpen] = useState(true)

  const Menus = [
    { title: "Dashboard" },
    { title: "Page", icon: <AiOutlineFileText /> },
    { title: "Media", icon: <BsCardImage />, spacing: true },
    {
      title: "Project",
      icon: <BsReverseLayoutTextSidebarReverse />,
      submenu: true,
      submenuItems: [
        { title: "Submenu 1" },
        { title: "Submenu 2" },
        { title: "Submenu 3" },
      ],
    },
    { title: "Analytics", icon: <AiOutlineBarChart /> },
    { title: "Inbox", icon: <AiOutlineMail /> },
    { title: "Profile", icon: <BsPerson />, spacing: true },
    { title: "Setting", icon: <AiOutlineSetting /> },
    { title: "Logout", icon: <AiOutlineLogout /> },
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
            <li
              key={index}
              className={`text-gray-200 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-while rounded-md ${
                menu.spacing ? "mt-9" : "mt-2"
              }`}
              onClick={() => {
                if (menu.submenuItems) {
                  setSubmenuOpen(!submenuOpen)
                }
              }}
            >
              <span className="text-2xl block float-left">
                {menu.icon ? menu.icon : <RiDashboardFill />}
              </span>
              <span
                className={`text-base font-medium flex-1 ${
                  !open && "hidden"
                } duration-200`}
              >
                {menu.title}
              </span>
              {menu.submenu && open && (
                <BsChevronDown className={`${submenuOpen && "rotate-180"}`} />
              )}
            </li>
            {menu.submenu && submenuOpen && open && (
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
            )}
          </>
        ))}
      </ul>
    </div>
  )
}

export default SideBar
