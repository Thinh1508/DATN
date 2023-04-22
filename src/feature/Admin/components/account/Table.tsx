import React from "react"
import Link from "next/link"

type Props = {}

const Table = (props: Props) => {
  const users = [
    {
      id: 1,
      name: "Huynh Van Thinh",
      dob: "10/11/2001",
      gender: 1,
      email: "thinhhuynh115@gmail.com",
      password: "Thinh1508",
      address: "hue city",
      status: 1,
    },
    {
      id: 2,
      name: "Huynh Van Thinh",
      dob: "10/11/2001",
      gender: 1,
      email: "thinhhuynh115@gmail.com",
      password: "Thinh1508",
      address: "hue city",
      status: 1,
    },
    {
      id: 3,
      name: "Huynh Van Thinh",
      dob: "10/11/2001",
      gender: 1,
      email: "thinhhuynh115@gmail.com",
      password: "Thinh1508",
      address: "hue city",
      status: 1,
    },
    {
      id: 4,
      name: "Huynh Van Thinh",
      dob: "10/11/2001",
      gender: 1,
      email: "thinhhuynh115@gmail.com",
      password: "Thinh1508",
      address: "hue city",
      status: 1,
    },
    {
      id: 5,
      name: "Huynh Van Thinh",
      dob: "10/11/2001",
      gender: 1,
      email: "thinhhuynh115@gmail.com",
      password: "Thinh1508",
      address: "hue city",
      status: 1,
    },
    {
      id: 6,
      name: "Huynh Van Thinh",
      dob: "10/11/2001",
      gender: 1,
      email: "thinhhuynh115@gmail.com",
      password: "Thinh1508",
      address: "hue city",
      status: 1,
    },
    {
      id: 7,
      name: "Huynh Van Thinh",
      dob: "10/11/2001",
      gender: 1,
      email: "thinhhuynh115@gmail.com",
      password: "Thinh1508",
      address: "hue city",
      status: 1,
    },
    {
      id: 8,
      name: "Huynh Van Thinh",
      dob: "10/11/2001",
      gender: 1,
      email: "thinhhuynh115@gmail.com",
      password: "Thinh1508",
      address: "hue city",
      status: 1,
    },
    {
      id: 9,
      name: "Huynh Van Thinh",
      dob: "10/11/2001",
      gender: 1,
      email: "thinhhuynh115@gmail.com",
      password: "Thinh1508",
      address: "hue city",
      status: 2,
    },
    {
      id: 10,
      name: "Huynh Van Thinh",
      dob: "10/11/2001",
      gender: 1,
      email: "thinhhuynh115@gmail.com",
      password: "Thinh1508",
      address: "hue city",
      status: 1,
    },
  ]

  return (
    <div className="bg-white w-full border p-4 mt-4  rounded-lg h-[83vh] xl:h-[80vh] overflow-y-auto">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-900 uppercase bg-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Day of Birth
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3 col-span-2">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="bg-gray-100 border-b text-gray-900 hover:bg-gray-300">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium  whitespace-nowrap"
                >
                  {user.name}
                </th>
                <td className="px-6 py-4">{user.dob}</td>
                <td className="px-6 py-4">
                  {user.gender === 1 ? "Male" : "Female"}
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 col-span-2">{user.address}</td>
                <td className="px-6 py-4">
                  {user.status === 1 ? "Normal" : "Block"}
                </td>
                <td className="flex items-center px-6 py-4 space-x-3">
                  {/* <Link
                    href={"/admin/account"}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </Link> */}
                  <Link
                    href={"/admin/account"}
                    className="font-medium text-red-600  hover:bg-red-600 hover:text-white border border-red-600 p-2 rounded-lg"
                  >
                    Delete
                  </Link>
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
