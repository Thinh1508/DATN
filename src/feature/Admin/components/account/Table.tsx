import React from "react"
import Link from "next/link"

import { BiEdit, BiTrashAlt } from "react-icons/bi"

import { getUsers } from "@/lib/helper"
import { useQuery } from "react-query"
import { useSelector } from "react-redux"

type Props = {}
type User = {
  _id: string
  name: string
  email: string
  address: string
  dob: string
  gender: number
  permissions: number
  status: string
}

const Table = (props: Props) => {
  const { isLoading, isError, data, error } = useQuery("users", getUsers)
  if (isLoading) return <div>Employee is Loading...</div>
  if (isError) return <div>Got Error {`${error}`}</div>

  return (
    <div className="bg-white w-full border p-4 mt-4  rounded-lg h-[84vh] xl:h-[82vh] overflow-y-auto">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-300 uppercase bg-gray-900">
            <tr>
              <th scope="col" className="px-6 py-3 xl:text-lg">
                Name
              </th>
              <th scope="col" className="px-6 py-3 xl:text-lg">
                Day of Birth
              </th>
              <th scope="col" className="px-6 py-3 xl:text-lg">
                Gender
              </th>
              <th scope="col" className="px-6 py-3 xl:text-lg">
                Email
              </th>
              <th scope="col" className="px-6 py-3 col-span-2 xl:text-lg">
                Address
              </th>
              <th scope="col" className="px-6 py-3 xl:text-lg">
                Status
              </th>
              <th scope="col" className="px-6 py-3 xl:text-lg">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((user: User) => (
              <tr
                key={user._id}
                className="bg-gray-200 border-b text-gray-900 hover:bg-gray-300"
              >
                <th
                  scope="row"
                  className="px-4 py-4 font-medium  whitespace-nowrap text-lg"
                >
                  {user.name}
                </th>
                <td className="px-4 py-4 text-lg">{user.dob}</td>
                <td className="px-4 py-4 text-lg">
                  {user.gender === 1 ? "Male" : "Female"}
                </td>
                <td className="px-4 py-4 text-lg">{user.email}</td>
                <td className="px-4 py-4 col-span-2 text-lg">{user.address}</td>
                <td className="px-4 py-4 text-lg">
                  <span
                    className={`${
                      user.status === "Active" ? "bg-green-500" : "bg-red-500"
                    } text-white px-6 py-2.5 rounded-xl text-lg`}
                  >
                    {user.status === "Active" ? "Active" : "Block"}
                  </span>
                </td>
                <td className="flex items-center px-4 py-4 space-x-3 ">
                  <button className="cursor">
                    <BiEdit size={25} color="rgb(34,197,94)" />
                  </button>
                  <button className="cursor">
                    <BiTrashAlt size={25} color="rgb(244,63,94)" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-7 w-full h-fit flex flex-row sm:justify-end justify-center">
        <nav className="">
          <ul className="inline-flex -space-x-px">
            <li>
              <Link
                href={"/admin/account"}
                className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
              >
                Previous
              </Link>
            </li>
            <li>
              <Link
                href={"/admin/account"}
                className="px-3 py-2 text-gray-600 border border-gray-300 bg-gray-200 hover:bg-gray-300 hover:text-blue-700"
              >
                1
              </Link>
            </li>
            <li>
              <Link
                href={"/admin/account"}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                ...
              </Link>
            </li>
            <li>
              <Link
                href={"/admin/account"}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                10
              </Link>
            </li>
            <li>
              <Link
                href={"/admin/account"}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
              >
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Table
