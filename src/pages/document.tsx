import React, { useState } from "react"
import SideBar from "@/layouts/SideBar"
import { getCategory, getDocument } from "@/lib/helper"
import Link from "next/link"
type Props = {
  data: any
  dataCategory: any
}

const DocumentPage = (props: Props) => {
  const agencyCategory = () => {
    const agency = props.dataCategory
    return agency.filter((category: any) => category.description === "agency")
  }
  const documentCategory = () => {
    const document = props.dataCategory
    return document.filter(
      (category: any) => category.description === "document"
    )
  }

  const [documentData, setDocumentData] = useState(props.data)

  const handleAgencyChange = (category: any) => {
    if (category.target.value !== "DEFAULT") {
      const data = props.data
      setDocumentData(
        data.filter(
          (document: any) => document.issuingAgency === category.target.value
        )
      )
    } else setDocumentData(props.data)
  }

  const handleCategoryChange = (category: any) => {
    if (category.target.value !== "DEFAULT") {
      const data = props.data
      setDocumentData(
        data.filter(
          (document: any) => document.category === category.target.value
        )
      )
    } else setDocumentData(props.data)
  }

  return (
    <div className="bg-white flex-1">
      <div className="grid grid-cols-10 space-x-8 pt-4 container mx-auto scrollbar-style ">
        <div className="col-span-10 lg:col-span-7 mb-4 bg-white  shadow-xl h-fit text-gray-900">
          <div className="border-t-4 border-t-[#049803] mt-2 pt-2 text-gray-950 px-2">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mt-2">
              {/* <input
                type="text"
                className="border border-gray-900 rounded-md p-1 focus:outline-none"
              /> */}
              <select
                name="district"
                defaultValue={"DEFAULT"}
                className="p-1  text-gray-900  border-1  focus:outline-none    border border-gray-900 rounded-md"
                onChange={handleAgencyChange}
              >
                <option className="relative" value="DEFAULT">
                  Cơ quan ban hành
                </option>
                {agencyCategory().map((category: any) => (
                  <option
                    className="relative"
                    value={category.title}
                    key={category._id}
                  >
                    {category.title}
                  </option>
                ))}
              </select>
              <select
                name="district"
                defaultValue={"DEFAULT"}
                className="p-1  text-gray-900 border-1 focus:outline-none border border-gray-900 rounded-md"
                onChange={handleCategoryChange}
              >
                <option className="relative" value="DEFAULT">
                  Loại văn bản
                </option>
                {documentCategory().map((category: any) => (
                  <option
                    className="relative"
                    value={category.title}
                    key={category._id}
                  >
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-2 mt-7 px-2 overflow-x-auto scroll-style">
            <table className="border border-collapse w-fit">
              <thead className="border">
                <tr>
                  <th className="border w-1/12 p-2">Stt</th>
                  <th className="border w-1/12 p-2">Số kí hiệu</th>
                  <th className="border w-1/12 p-2">Cơ quan ban hành</th>
                  <th className="border w-1/12 p-2">Loại văn bản</th>
                  <th className="border w-5/12 p-2">Trích yếu</th>
                  <th className="border w-1/12 p-2">Ngày ban hành</th>
                </tr>
              </thead>
              <tbody>
                {documentData &&
                  documentData.map((document: any, index: number) => (
                    <tr key={document._id}>
                      <td className="border pl-1">{index + 1}</td>
                      <td className="border pl-1">{document.symbol}</td>
                      <td className="border pl-1">{document.issuingAgency}</td>
                      <td className="border pl-1">{document.category}</td>
                      <td className="border pl-1">
                        <Link
                          href={{
                            pathname: "/documentDetail",
                            query: {
                              documentId: document._id,
                            },
                          }}
                          className="text-blue-600 hover:text-red-500"
                        >
                          {document.title}
                        </Link>
                      </td>
                      <td className="border pl-1">{document.effective}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className=" p-5 w-full h-fit flex flex-row sm:justify-end justify-center">
            <nav className="">
              <ul className="inline-flex -space-x-px">
                <li>
                  <Link
                    href={"/admin/document"}
                    className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                  >
                    Trước
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
                    className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                  >
                    Sau
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <SideBar />
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const data = await getDocument()

  const dataCategory = await getCategory()

  return { props: { data, dataCategory } }
}

export default DocumentPage
