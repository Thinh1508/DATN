import Link from "next/link"
import React, { useState } from "react"
import { useRouter } from "next/router"
import { AxiosError } from "axios"

import { addUser, getUser, loginUser } from "@/lib/helper"
import { useMutation, useQuery } from "react-query"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

type Props = {}

const Login = (props: Props) => {
  const listUser = useQuery("user", getUser)

  const [userInfo, setUserInfo] = useState({ email: "", password: "" })
  const [userName, setUserName] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  const [loading, setLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const route = useRouter()

  const addMutation = useMutation(addUser, {
    onSuccess: () => {
      showMess("Đăng kí tài khoản thành công", "success")
      setIsLogin(true)
      setShowPass(false)
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
          showMess("Email hoặc mật khẩu không đúng", "error")
        } else {
          route.push("/")
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          showMess("Email hoặc mật khẩu không đúng", "error")
        }
      }
      setLoading(false)
    } else {
      if (userInfo.password !== confirmPass) {
        showMess("Xát nhận mật khẩu không đúng", "error")
      } else {
        if (!checkEmail(userInfo.email)) {
          const model = {
            name: userName,
            email: userInfo.email,
            password: userInfo.password,
          }
          addMutation.mutate(model)
        } else {
          showMess("Email đã tồn tại", "error")
        }
      }
    }
  }
  function checkEmail(email: string) {
    let check: boolean = false
    listUser.data.map((user: any) => {
      if (user.email === email) check = true
    })
    return check
  }
  function showMess(mess: string, type: string) {
    if (type !== "error") {
      toast.success(mess, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    } else {
      toast.error(mess, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }
  if (listUser.isLoading)
    return <div className="bg-white flex-1">Đang tải dữ liệu...</div>
  if (listUser.isError)
    return (
      <div className="bg-white flex-1">
        Lỗi dữ liệu! Vui lòng tải lại trang...
      </div>
    )
  return (
    <div className="bg-white flex flex-1 justify-center">
      <div className="flex  container mx-auto justify-center items-center">
        <div className="w-1/3 p-6 bg-white shadow-xl rounded-b-md border-t-4 border-t-green-700  ">
          <div className=" capitalize flex items-center justify-center my-2">
            <span
              className={`cursor-pointer mr-10 ${
                isLogin
                  ? "font-bold text-2xl text-gray-900"
                  : "font-semibold text-lg text-gray-500"
              }  capitalize relative after:absolute after:-bottom-1 after:left-0 after:bg-slate-900 after:h-1 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-300
              hover:font-bold hover:text-2xl hover:text-gray-900 `}
              onClick={() => {
                setIsLogin(true)
                setShowPass(false)
                setShowConfirmPass(false)
                setUserName("")
                setConfirmPass("")
              }}
            >
              đăng nhập
            </span>
            <span
              className={`cursor-pointer  ${
                !isLogin
                  ? "font-bold text-2xl text-gray-900"
                  : "font-semibold text-lg text-gray-500"
              }  capitalize relative after:absolute after:-bottom-1 after:left-0 after:bg-slate-900 after:h-1 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-300 hover:font-bold hover:text-2xl hover:text-gray-900`}
              onClick={() => {
                setIsLogin(false)
                setShowPass(false)
                setUserInfo({ email: "", password: "" })
              }}
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
            <div className="mb-6 ">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Mật khẩu
              </label>
              <div className="relative ">
                <input
                  type={!showPass ? "password" : "text"}
                  name="password"
                  value={userInfo.password}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      password: e.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:outline-none focus:ring-green-500 focus:border-green-500 block w-full p-2.5 pr-10 "
                  required
                />
                <div
                  className="text-gray-500 absolute right-2 top-[27%] cursor-pointer"
                  onClick={() => setShowPass(!showPass)}
                >
                  {!showPass ? (
                    <AiOutlineEye size={20} />
                  ) : (
                    <AiOutlineEyeInvisible size={20} />
                  )}
                </div>
              </div>
            </div>
            {!isLogin && (
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Nhập lại mật khẩu
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    name="confirmPass"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:outline-none focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
                    required
                  />
                  <div
                    className="text-gray-500 absolute right-2 top-[27%] cursor-pointer"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                  >
                    {!showConfirmPass ? (
                      <AiOutlineEye size={20} />
                    ) : (
                      <AiOutlineEyeInvisible size={20} />
                    )}
                  </div>
                </div>
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
                    setShowPass(false)
                    setUserInfo({ email: "", password: "" })
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
      <ToastContainer />
    </div>
  )
}

export default Login
