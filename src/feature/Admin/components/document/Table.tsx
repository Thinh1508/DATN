import React, { useState } from "react"
import Link from "next/link"

import { BiEdit, BiTrashAlt } from "react-icons/bi"
import AddModal from "../document/AddModal"

type Props = {}

const Table = (props: Props) => {
  const [addModal, setAddModal] = useState(false)
  const handleOnClose = (mess: string) => {
    setAddModal(false)
  }
  return (
    <div className="bg-white w-full border p-4 mt-4  rounded-lg h-[84vh] xl:h-[82vh] overflow-y-auto scrollbar-style">
      <div className="mb-4">
        <button
          className="bg-white py-2 px-6 border-green-600 text-green-600 border-2 rounded-lg hover:bg-green-600 hover:text-white"
          onClick={() => setAddModal(true)}
        >
          <span className="font-medium">Add New Document</span>
        </button>
      </div>
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-300 uppercase bg-gray-900">
          <tr>
            <th scope="col" className="px-4 py-3 xl:text-lg">
              Số/Kí hiệu
            </th>
            <th scope="col" className="px-4 py-3 xl:text-lg">
              Loại văn bản
            </th>
            <th scope="col" className="px-4 py-3 xl:text-lg">
              Cơ quan ban hành
            </th>
            <th scope="col" className="px-4 py-3 xl:text-lg">
              Ngày ban hàng
            </th>
            <th scope="col" className="px-4 py-3  xl:text-lg">
              Ngày có hiệu lực
            </th>
            <th scope="col" className="px-4 py-3 xl:text-lg">
              Status
            </th>
            <th scope="col" className="px-4 py-3 xl:text-lg">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-200 border-b text-gray-900 hover:bg-gray-300">
            <th
              scope="row"
              className="px-4 py-4 font-medium  whitespace-nowrap text-lg"
            ></th>
            <td className="px-4 py-4 text-lg"></td>
            <td className="px-4 py-4 text-lg"></td>
            <td className="px-4 py-4 text-lg"></td>
            <td className="px-4 py-4 text-lg"></td>
            <td className="px-4 py-4 text-lg">
              <span
                className={` text-white px-6 py-2.5 rounded-xl text-lg`}
              ></span>
            </td>
            <td className="flex items-center px-4 py-4 space-x-3 relative">
              <button className="cursor">
                <BiEdit size={25} color="rgb(34,197,94)" />
              </button>
              <button className="cursor">
                <BiTrashAlt size={25} color="rgb(244,63,94)" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-7 w-full h-fit flex flex-row sm:justify-end justify-center">
        <nav className="">
          <ul className="inline-flex -space-x-px">
            <li>
              <Link
                href={"/admin/document"}
                className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
              >
                Previous
              </Link>
            </li>
            <li>
              <Link
                href={"/admin/document"}
                className="px-3 py-2 text-gray-600 border border-gray-300 bg-gray-200 hover:bg-gray-300 hover:text-blue-700"
              >
                1
              </Link>
            </li>
            <li>
              <Link
                href={"/admin/document"}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                ...
              </Link>
            </li>
            <li>
              <Link
                href={"/admin/document"}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                10
              </Link>
            </li>
            <li>
              <Link
                href={"/admin/document"}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
              >
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <AddModal onClose={handleOnClose} visible={addModal} />
    </div>
  )
}

export default Table
