import Link from "next/link"
import React, { useState } from "react"
import { useRouter } from "next/router"
import { AxiosError } from "axios"

import { addUser, loginUser } from "@/lib/helper"
import { useMutation } from "react-query"

type Props = {}

const Login = (props: Props) => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" })
  const [userName, setUserName] = useState("")
  const [pass, setPass] = useState("")
  const [confirmPass, setConfirmPass] = useState("")

  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const route = useRouter()

  const addMutation = useMutation(addUser, {
    onSuccess: () => {
      console.log("success")
      setIsLogin(true)
    },
    onError: () => {
      console.log("error")
    },
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (isLogin) {
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
    } else {
      if (userInfo.password !== confirmPass) {
        setSubmitError(true)
      } else {
        setSubmitError(false)
        const model = {
          name: userName,
          email: userInfo.email,
          password: userInfo.password,
        }
        addMutation.mutate(model)
      }
    }
  }
  return (
    <div className="bg-[#f1f1f1]">
      <div className="min-h-[67vh] flex container mx-auto justify-center items-center bg-[#f1f1f1]">
        <div className="w-1/3 p-6 shadow-lg bg-white rounded-md">
          <div className=" capitalize flex items-center justify-center my-2">
            <span
              className={`cursor-pointer mr-10 ${
                isLogin
                  ? "font-bold text-2xl text-gray-900"
                  : "font-semibold text-lg text-gray-500"
              }  capitalize relative after:absolute after:-bottom-1 after:left-0 after:bg-slate-900 after:h-1 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-300
              hover:font-bold hover:text-2xl hover:text-gray-900 `}
              onClick={() => setIsLogin(true)}
            >
              đăng nhập
            </span>
            <span
              className={`cursor-pointer  ${
                !isLogin
                  ? "font-bold text-2xl text-gray-900"
                  : "font-semibold text-lg text-gray-500"
              }  capitalize relative after:absolute after:-bottom-1 after:left-0 after:bg-slate-900 after:h-1 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-300 hover:font-bold hover:text-2xl hover:text-gray-900`}
              onClick={() => setIsLogin(false)}
            >
              đăng kí
            </span>
          </div>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Họ Tên
                </label>
                <input
                  type="text"
                  name="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:outline-none focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
                  placeholder="Nguyen Van A"
                  required
                />
              </div>
            )}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Email
              </label>
              <input
                type="email"
                name="email"
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
                name="password"
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
            {!isLogin && (
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Nhập lại mật khẩu
                </label>
                <input
                  type="password"
                  name="confirmPass"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:outline-none focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
                  required
                />
              </div>
            )}
            {isLogin && (
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
            )}
            <div className="mb-6">
              <button
                type="submit"
                className="text-white w-full bg-green-700 border  font-medium rounded-lg text-sm  px-5 py-2.5 text-center hover:bg-green-900 cursor-pointer "
                disabled={loading}
              >
                {isLogin ? "Đăng nhập" : "Đăng kí"}
              </button>
              {submitError && (
                <label className="block my-2 text-sm font-medium text-red-600 mx-auto">
                  {isLogin
                    ? "Email hoặc mật khẩu không đúng"
                    : "Mật khẩu xát nhận khôn trùng khớp"}
                </label>
              )}
            </div>
          </form>

          {isLogin && <hr className="bg-gray-400 h-0.5" />}
          <div className="my-6">
            {isLogin && (
              <button
                type="button"
                onClick={() => {
                  if (isLogin) {
                    setIsLogin(false)
                  }
                }}
                className="hover:text-white w-full hover:bg-green-700   font-medium rounded-lg text-sm  px-5 py-2.5 text-center bg-white border-green-700 border-2 text-green-700 "
              >
                Tạo tài khoản mới
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
