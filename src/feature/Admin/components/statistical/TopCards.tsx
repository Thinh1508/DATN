import { getCerSearch, getLicenseSearch, getReportSearch } from "@/lib/helper"
import React, { useEffect, useState } from "react"
import { useQuery } from "react-query"

type Props = {
  date: any
  changeDate: (date: string) => void
}

const TopCards = (props: Props) => {
  const today: Date = new Date()
  const month: number = today.getMonth() + 1
  const year: number = today.getFullYear()
  const todayString: string = `${year}-${month < 10 ? "0" + month : month}`

  const [cer, setCer] = useState<any>(null)
  const [license, setLicense] = useState<any>(null)
  const [report, setReport] = useState<any>(null)

  useEffect(() => {
    const fetchCer = async () => {
      try {
        const result = await getCerSearch(props.date)
        setCer(result)
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu", error)
      }
    }

    fetchCer()
  }, [props.date])

  useEffect(() => {
    const fetchCer = async () => {
      try {
        const result = await getLicenseSearch(props.date)
        setLicense(result)
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu", error)
      }
    }

    fetchCer()
  }, [props.date])

  useEffect(() => {
    const fetchCer = async () => {
      try {
        const result = await getReportSearch(props.date)
        setReport(result)
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu", error)
      }
    }

    fetchCer()
  }, [props.date])

  if (!cer || !license || !report) return <div>Đang tải dữ liệu...</div>
  return (
    <div className="grid lg:grid-cols-5 gap-4 pt-4">
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-center w-full border p-4 rounded-lg items-center">
        <div className=" w-full">
          <p className="text-gray-900 text-2xl font-semibold">
            Đăng kí cấp giấy ATVSTP
          </p>
        </div>
        <p className="bg-green-200 p-4 rounded-lg">
          <span className="text-green-700 text-xl font-semibold">
            {cer.length}
          </span>
        </p>
      </div>
      <div className=" bg-white flex justify-center w-full border p-4 rounded-lg items-center">
        <div className=" w-full">
          <p className="text-gray-900 text-2xl font-semibold">Cấp thành công</p>
        </div>
        <p className="bg-green-200 p-4 rounded-lg">
          <span className="text-green-700 text-xl font-semibold">
            {license.length}
          </span>
        </p>
      </div>
      <div className=" bg-white flex justify-center w-full border p-4 rounded-lg items-center">
        <div className=" w-full">
          <p className="text-gray-900 text-2xl font-semibold">
            Báo cáo vi phạm
          </p>
        </div>
        <p className="bg-green-200 p-4 rounded-lg">
          <span className="text-green-700 text-xl font-semibold">
            {report.length}
          </span>
        </p>
      </div>

      <div className=" bg-white w-full border p-4 rounded-lg  text-gray-900">
        <label className="block text-sm font-medium text-gray-700">
          Chọn tháng và năm:
        </label>
        <input
          type="month"
          name="month-year"
          defaultValue={todayString}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none"
          onChange={(e) => {
            props.changeDate(e.target.value)
            console.log(e.target.value, props.date)
          }}
        />
      </div>
    </div>
  )
}

export default TopCards
