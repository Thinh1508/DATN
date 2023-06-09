import { getUserSearch } from "@/lib/helper"
import React, { useState, useEffect } from "react"

import { AiOutlineUserAdd } from "react-icons/ai"

type Props = {
  date: any
}

const RecentOrders = (props: Props) => {
  const [user, setUser] = useState<any>(null)
  useEffect(() => {
    const fetchCer = async () => {
      try {
        const result = await getUserSearch(props.date)
        setUser(result)
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu", error)
      }
    }

    fetchCer()
  }, [props.date])

  if (!user) return <div>Đang tải dữ liệu...</div>

  return (
    <div className="w-full col-span-1 relative lg:h-[75vh] h-[50vh] m-auto p-4 border rounded-lg overflow-scroll bg-white">
      <h1 className="text-gray-900">Các tài khoản tạo mới</h1>
      <ul>
        {user.map((profile: any) => (
          <li
            key={profile._id}
            className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer "
          >
            <div className="bg-green-100 rounded-lg p-3">
              <AiOutlineUserAdd className="text-green-800" />
            </div>
            <div className="pl-4">
              <p className="text-gray-800 text-xl">{profile.name}</p>
              <p className="text-gray-600 font-bold">{profile.email} Access</p>
            </div>
            <p className="lg:flex hidden absolute right-6 text-sm text-gray-900">
              {profile.dob}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentOrders
