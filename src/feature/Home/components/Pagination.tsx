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
    <div className="m-2 flex text-gray-700">
      <h1 className="p-1">Số phần tử tối đa trên 1 trang: 10</h1>
      <div className="ml-auto space-x-2 ">
        {currentPage !== 1 && (
          <Link
            href={getPageLink(currentPage - 1)}
            className="hover:bg-gray-200 hover:text-red-500 hover:rounded-md p-1"
          >
            Trước
          </Link>
        )}
        <select
          value={currentPage}
          onChange={(e: any) => router.push(getPageLink(e.target.value))}
          className="appearance-none outline-none  items-center  text-gray-900 p-1"
        >
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1

            return (
              <option value={pageNumber} key={pageNumber} className="mx-2">
                {pageNumber}
              </option>
            )
          })}
        </select>
        {currentPage !== totalPages && (
          <Link
            href={getPageLink(currentPage + 1)}
            className="hover:bg-gray-200 hover:text-red-500 hover:rounded-md p-1"
          >
            Sau
          </Link>
        )}
      </div>
    </div>
  )
}

export default Pagination
