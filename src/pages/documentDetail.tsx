import SideBar from "@/layouts/SideBar"
import Link from "next/link"
import React from "react"
import { AiFillFilePdf } from "react-icons/ai"
import { IoMdArrowRoundBack } from "react-icons/io"

type Props = {
  data: any
  dataSame: any
}

const DocumentDetail = (props: Props) => {
  return (
    <div className="bg-white">
      <div className="grid grid-cols-10 space-x-8 pt-4 container mx-auto scrollbar-style">
        <div className="col-span-10 lg:col-span-7 mt-2 mb-4 pt-2  space-y-4 bg-white border-t-4 border-t-[#049803] shadow-xl h-fit">
          <div className="px-3 py-7 h-fit text-gray-950">
            <div className="flex items-center sm:block ">
              <Link
                href="/document"
                className="mr-2 p-2 block sm:hidden bg-gray-300  rounded-md text-white hover:text-black"
              >
                <IoMdArrowRoundBack size={25} />
              </Link>
              <h1 className="text-3xl font-semibold pb-1 sm:pb-5">
                Chi tiết văn bản
              </h1>
            </div>
            <table className="border border-collapse w-full mt-2">
              <thead className="border">
                <tr>
                  <th className="border border-gray-300  px-1 py-2 w-2/6">
                    Tiêu đê
                  </th>
                  <th className="border border-gray-300  px-1 py-2 w-5/6">
                    Nội dung
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300  px-1 py-2 pl-1">
                    Số kí hiệu
                  </td>
                  <td className="border border-gray-300  px-1 py-2 pl-1">
                    {props.data.symbol}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300  px-1 py-2 pl-1">
                    Ngày phát hành
                  </td>
                  <td className="border border-gray-300  px-1 py-2 pl-1">
                    {props.data.issued}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300  px-1 py-2 pl-1">
                    Ngày có hiệu lực
                  </td>
                  <td className="border border-gray-300  px-1 py-2 pl-1">
                    {props.data.effective}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300  px-1 py-2 pl-1">
                    Cơ quan ban hành
                  </td>
                  <td className="border border-gray-300  px-1 py-2 pl-1">
                    {props.data.issuingAgency}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300  px-1 py-2 pl-1">
                    Loại văn bản
                  </td>
                  <td className="border border-gray-300  px-1 py-2 pl-1">
                    {props.data.category}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300  px-1 py-2 pl-1">
                    Nội dung
                  </td>
                  <td className="border border-gray-300  px-1 py-2 pl-1">
                    {props.data.content}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300  px-1 py-2 pl-1">
                    Trích yếu
                  </td>
                  <td className="border border-gray-300  px-1 py-2 pl-1">
                    {props.data.title}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300  px-1 py-2 pl-1">
                    Tệp đính kèm
                  </td>
                  <td className="border border-gray-300  px-1 py-2 pl-1">
                    <Link href={props.data.note} target="_blank">
                      <AiFillFilePdf size={25} />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
            <h1 className="text-xl font-semibold text-red-500 mt-7">
              Văn bản có liên quan
            </h1>
            <hr className="h-1  bg-gray-300" />
            {props.dataSame &&
              props.dataSame.map(
                (document: any) =>
                  props.data._id !== document._id && (
                    <Link
                      className="text-slate-900 font-bold flex gap-2 my-2 hover:text-red-600 text-sm"
                      href={{
                        pathname: "/documentDetail",
                        query: {
                          documentId: document._id,
                        },
                      }}
                      key={document._id}
                    >
                      <div className="h-3 w-3 md:h-2 md:w-2 xl:h-3 xl:w-3 mt-1 xl:mt-1.5 text-red-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          fill="currentColor"
                        >
                          <path d="M246.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L178.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C47.63 444.9 55.81 448 64 448s16.38-3.125 22.62-9.375l160-160C259.1 266.1 259.1 245.9 246.6 233.4zM438.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L370.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C239.6 444.9 247.8 448 256 448s16.38-3.125 22.62-9.375l160-160C451.1 266.1 451.1 245.9 438.6 233.4z" />
                        </svg>
                      </div>
                      <p className="flex-1 font-normal md:text-xs xl:text-base">
                        {document.title}
                      </p>
                    </Link>
                  )
              )}
          </div>
        </div>
        <SideBar />
      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/document/${context.query.documentId}`
    )
    const data = await res.json()

    const Options = {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: data.category,
    }
    const response = await fetch(
      `http://localhost:3000/api/document/view`,
      Options
    )
    const dataSame = await response.json()

    return { props: { data, dataSame } }
  } catch (error) {
    console.error(error)
    return { props: { data: [], dataSame: [] } }
  }
}

export default DocumentDetail
