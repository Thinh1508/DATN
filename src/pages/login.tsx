import Link from "next/link"
import React, { useState } from "react"
import { useRouter } from "next/router"
import { AxiosError } from "axios"

import { loginUser } from "@/lib/helper"

type Props = {}

const Login = (props: Props) => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const route = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      setLoading(true)
      const loginRes = await loginUser({
        email: userInfo.email,
        password: userInfo.password,
      })

      if (loginRes && !loginRes.ok) {
        setSubmitError(true)
      } else {
        route.push("/")
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setSubmitError(true)
      }
    }
    setLoading(false)
  }
  return (
    <div className="bg-[#f1f1f1]">
      <div className="min-h-[67vh] flex container mx-auto justify-center items-center bg-[#f1f1f1]">
        <div className="w-1/3 p-6 shadow-lg bg-white rounded-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    email: e.target.value,
                  })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:outline-none focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
                placeholder="name@gmail.com"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                value={userInfo.password}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    password: e.target.value,
                  })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:outline-none focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
                required
              />
            </div>
            <div className="flex items-start mb-6 justify-between">
              <div className="flex items-center">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-300 "
                  />
                </div>
                <label className="ml-2 text-sm font-medium text-gray-900 ">
                  Lưu tài khoản
                </label>
              </div>
              <Link
                href={"login"}
                className="ml-2 text-sm font-medium text-gray-900 dark:text-white-300 float-right hover:text-blue-700"
              >
                Quên mật khẩu?
              </Link>
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="text-white w-full bg-green-700 border  font-medium rounded-lg text-sm  px-5 py-2.5 text-center hover:bg-green-900 cursor-pointer "
                disabled={loading}
              >
                Đăng nhập
              </button>
              {submitError && (
                <label className="block my-2 text-sm font-medium text-red-600 mx-auto">
                  Email hoặc mật khẩu không đúng
                </label>
              )}
            </div>
          </form>
          <hr className="bg-gray-400 h-0.5" />
          <div className="my-6">
            <button
              type="button"
              className="hover:text-white w-full hover:bg-green-700   font-medium rounded-lg text-sm  px-5 py-2.5 text-center bg-white border-green-700 border-2 text-green-700 "
            >
              <Link href={"login"}>Tạo tài khoản mới</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
