import React from "react"

import { data } from "./data"

import { FaEye } from "react-icons/fa"

type Props = {}

const RecentOrders = (props: Props) => {
  return (
    <div className="w-full col-span-1 relative lg:h-[75vh] h-[50vh] m-auto p-4 border rounded-lg overflow-scroll bg-white">
      <h1 className="text-gray-900">RecentOrders</h1>
      <ul>
        {data.map((order, id) => (
          <li
            key={id}
            className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer "
          >
            <div className="bg-green-100 rounded-lg p-3">
              <FaEye className="text-green-800" />
            </div>
            <div className="pl-4">
              <p className="text-gray-600 font-bold">{order.total} Access</p>
              <p className="text-gray-800 text-xl">{order.name.first}</p>
            </div>
            <p className="lg:flex hidden absolute right-6 text-sm text-gray-900">
              {order.date}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentOrders
