import React, { FormEvent, FormEventHandler, useReducer } from "react"
import { useQueryClient, useMutation } from "react-query"

import { BsChevronDown } from "react-icons/bs"
import { addUser, getUsers } from "@/lib/helper"

type Props = { visible: boolean; onClose: () => void }

const formReducer = (state: object, event: any) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  }
}

const AddModal = (props: Props) => {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useReducer(formReducer, {})
  const addMutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.prefetchQuery("users", getUsers)
    },
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (Object.keys(formData).length == 0) {
      return console.log("Don have Form Data")
    }
    let { name, email, address, dob, gender, permission, status } = formData

    const model = {
      name,
      email,
      address,
      dob,
      gender,
      permission,
      status: status ?? "Active",
    }

    addMutation.mutate(model)
  }

  if (addMutation.isSuccess) console.log("sussecc")

  if (!props.visible) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-20">
      <div className="relative w-full max-w-3xl max-h-full">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 className="text-2xl font-semibold text-gray-900 ">
              Add New Account
            </h3>
            <button
              type="button"
              className="text-gray-400 text-sm bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center "
              onClick={props.onClose}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6">
              <div className="relative border-2 border-gray-400 rounded-lg">
                <input
                  type="text"
                  name="name"
                  onChange={setFormData}
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-950 bg-transparent peer  appearance-none  focus:outline-none focus:ring-0 "
                  placeholder=" "
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 top-0.5 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0.5 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Name
                </label>
              </div>

              <div className="relative border-2 border-gray-400 rounded-lg">
                <input
                  type="text"
                  name="email"
                  onChange={setFormData}
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-900 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
                  placeholder=" "
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Email
                </label>
              </div>

              <div className="relative border-2 border-gray-400 rounded-lg">
                <input
                  type="text"
                  name="address"
                  onChange={setFormData}
                  className="block px-2.5 pb-1.5 pt-3 w-full text-xl text-gray-900 bg-transparent   appearance-none  focus:outline-none focus:ring-0 focus:border-3 peer"
                  placeholder=" "
                />
                <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-3 scale-75 -top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                  Address
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative sm:max-w-sm">
                  <input
                    type="date"
                    name="dob"
                    onChange={setFormData}
                    className="bg-gray-50 border-2 border-gray-400 text-gray-900 text-xl rounded-lg outline-none  block w-full p-2.5 "
                    placeholder="Select date"
                  />
                </div>
                <div className="relative border-2 border-gray-400 rounded-lg">
                  <select
                    name="gender"
                    onChange={setFormData}
                    defaultValue={"DEFAULT"}
                    className="block px-2.5 py-2.5 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  >
                    <option className="relative" value="DEFAULT">
                      Choose a gender
                    </option>
                    <option value="1">male</option>
                    <option value="2">Female</option>
                  </select>
                  <BsChevronDown className="absolute right-3 top-[30%] text-gray-600" />
                </div>
                <div className="relative border-2 border-gray-400 rounded-lg">
                  <select
                    name="permission"
                    onChange={setFormData}
                    defaultValue={"DEFAULT"}
                    className="block px-2.5 py-2.5 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  >
                    <option className="relative" value="DEFAULT">
                      Choose a permission
                    </option>
                    <option value="1">User</option>
                    <option value="2">Inspection</option>
                    <option value="3">Admin</option>
                  </select>
                  <BsChevronDown className="absolute right-3 top-[30%] text-gray-600" />
                </div>
              </div>
              <div className="relative flex flex-row items-center gap-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    value={"Active"}
                    id="radioDefault1"
                    onChange={setFormData}
                    name="status"
                    className="form-check-input appearance-none rounded-full h-5 w-5 border border-gray-300 checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  />
                  <label
                    htmlFor="radioDefault1"
                    className="inline-block text-gray-900 text-xl"
                  >
                    Active
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    value={"Block"}
                    id="radioDefault2"
                    name="status"
                    onChange={setFormData}
                    className="form-check-input appearance-none rounded-full h-5 w-5 border border-gray-300 checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  />
                  <label
                    htmlFor="radioDefault2"
                    className="inline-block text-gray-900 text-xl"
                  >
                    Block
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
              <button
                type="submit"
                className="sm:w-1/2 text-green-900 bg-white border border-green-900 hover:bg-green-800  hover:transition-all hover:duration-500 ease-in-out hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center "
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddModal
