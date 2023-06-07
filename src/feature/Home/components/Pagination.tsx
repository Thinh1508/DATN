import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

const Pagination = ({ currentPage, totalPages, category }: any) => {
  const getPageLink = (page: Number) => {
    if (category) {
      return `/post?page=${page}&&category=${category}`
    }
    return `/post?page=${page}`
  }
  const router = useRouter()

  return (
    <div className="m-2 flex text-gray-700 items-center">
      <h1 className="p-1 w-1/3 sm:block hidden">
        Số phần tử tối đa trên 1 trang: 10
      </h1>
      <div className=" p-5 w-full h-fit flex flex-row sm:justify-end justify-center">
        <nav className="">
          <ul className="inline-flex -space-x-px items-center">
            <li>
              <Link
                href={getPageLink(currentPage - 1)}
                className={`px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${
                  currentPage === 1 && "pointer-events-none opacity-70"
                }`}
              >
                Trước
              </Link>
            </li>
            <li>
              <select
                value={currentPage}
                onChange={(e: any) => router.push(getPageLink(e.target.value))}
                className="px-3 py-2 mb-0.5 text-gray-600 border border-gray-300 bg-gray-200 hover:bg-gray-300 hover:text-blue-700 focus:outline-none"
              >
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1

                  return (
                    <option
                      value={pageNumber}
                      key={pageNumber}
                      className="mx-2"
                    >
                      {pageNumber}
                    </option>
                  )
                })}
              </select>
            </li>
            <li>
              <Link
                href={getPageLink(currentPage + 1)}
                className={`px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ${
                  currentPage === totalPages && "pointer-events-none opacity-70"
                }`}
              >
                Tiếp theo
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Pagination
