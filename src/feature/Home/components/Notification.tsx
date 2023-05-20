import React, { useState } from "react"
import Link from "next/link"

type Props = {
  data: any
}

const Notification = ({ data }: Props) => {
  const listNoti = data
  const firstValue: any = Object.values(listNoti)[0]
  const renderList = listNoti.map((noti: any, index: any) => {
    if (index > 0)
      return (
        <li key={noti._id}>
          <Link
            className="text-slate-900 font-bold flex gap-2 mb-2 hover:text-green-600 text-sm"
            href={{
              pathname: "/postDetail",
              query: {
                idPost: noti._id,
                category: noti.category,
              },
            }}
          >
            <div className="h-3 w-3 md:h-2 md:w-2 xl:h-3 xl:w-3 mt-1 xl:mt-1.5 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                fill="currentColor"
              >
                <path d="M246.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L178.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C47.63 444.9 55.81 448 64 448s16.38-3.125 22.62-9.375l160-160C259.1 266.1 259.1 245.9 246.6 233.4zM438.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L370.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C239.6 444.9 247.8 448 256 448s16.38-3.125 22.62-9.375l160-160C451.1 266.1 451.1 245.9 438.6 233.4z" />
              </svg>
            </div>
            <p className="flex-1 font-normal md:text-xs xl:text-base">
              {noti.title}
            </p>
          </Link>
        </li>
      )
  })
  return (
    <div className=" relative min-h-[250px]  shadow-xl border-t-4 border-t-green-600 rounded-b-lg border-slate-400 !mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full p-4 gap-6">
        <Link
          className="h-full w-full block"
          href={{
            pathname: "/postDetail",
            query: {
              idPost: firstValue._id,
              category: firstValue.category,
            },
          }}
        >
          <img
            src={firstValue.background}
            alt=""
            className="w-full md:max-h-[350px] object-cover"
          />
        </Link>
        <div className="flex-1 space-y-2">
          <Link
            className="font-bold block gap-4 text-green-700 hover:text-green-600 border-b-[1px]  pb-2 !mb-5"
            href={{
              pathname: "/postDetail",
              query: {
                idPost: firstValue._id,
                category: firstValue.category,
              },
            }}
          >
            <p className="flex-1 ">{firstValue.title}</p>
          </Link>
          <ul>{renderList}</ul>
        </div>
      </div>
      <Link
        href={{
          pathname: "/post",
          query: {
            category: "Truyền thông",
          },
        }}
      >
        <span className="absolute col-span-3 px-3 py-1 bg-green-600 uppercase text-slate-100  hover:text-yellow-400 -translate-y-5 text-sm font-bold top-0.5 rounded-r-full">
          thông báo
        </span>
      </Link>
    </div>
  )
}

export default Notification
