import React, { useState } from "react"
import Link from "next/link"

import AddModal from "./AddModal"

type Props = {}

const Header = (props: Props) => {
  const [showModal, setShowModal] = useState(false)

  const handleOnClose = () => setShowModal(false)

  return (
    <div className="bg-white flex flex-col gap-2 w-full border p-4 mt-4 md:flex-row sm:justify-between rounded-lg">
      <div className="flex flex-row items-center">
        <Link href={"/admin/account/"}>
          <span className="text-gray-900 font-medium text-xl mr-4 cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:bg-slate-900 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-300">
            Users
          </span>
        </Link>
        <Link href={"/admin/account/"}>
          <span className="text-gray-500 hover:text-gray-900 font-medium text-xl cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:bg-slate-900 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-300">
            Stores
          </span>
        </Link>
      </div>
      <div className="flex flex-row items-center gap-2">
        <button
          onClick={() => setShowModal(true)}
          className="min-w-fit text-white bg-[rgb(34,197,94)] hover:bg-green-600 hover:text-gray-100 rounded-lg text-sm p-1.5 sm:p-2.5 cursor-pointer"
        >
          <span className="text-xs uppercase font-normal ">new account</span>
        </button>
        <select
          defaultValue={"DEFAULT"}
          className="bg-gray-300 outline-none flex items-center  text-gray-900 text-sm rounded-lg focus:ring-blue-500  w-full p-1.5 sm:p-2.5 "
        >
          <option value="DEFAULT">Choose a status</option>
          <option value="1">Normal</option>
          <option value="2">Block</option>
        </select>
      </div>
      <AddModal onClose={handleOnClose} visible={showModal} />
    </div>
  )
}

export default Header
