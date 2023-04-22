import React from "react"

import { BsChevronDown } from "react-icons/bs"

type Props = { visible: boolean; onClose: () => void }

const AddModal = (props: Props) => {
  if (!props.visible) return null
  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-20"
      //   onClick={props.onClose}
    >
      <div className="relative w-full max-w-3xl max-h-full">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 ">
              Add New Account
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
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
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="relative border-2 border-gray-400 rounded-lg">
              <input
                type="text"
                // id="small_outlined"
                className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label className="absolute text-sm text-gray-500  duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                Name
              </label>
            </div>

            <div className="relative border-2 border-gray-400 rounded-lg">
              <input
                type="text"
                // id="small_outlined"
                className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label className="absolute text-sm text-gray-500  duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                Email
              </label>
            </div>
            <div className="relative border-2 border-gray-400 rounded-lg">
              <input
                type="text"
                // id="small_outlined"
                className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label className="absolute text-sm text-gray-500  duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                Address
              </label>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="relative max-w-sm">
                <input
                  type="date"
                  className="bg-gray-50 border-2 border-gray-400 text-gray-900 text-sm rounded-lg outline-none  block w-full p-2.5 "
                  placeholder="Select date"
                />
              </div>
              <div className="relative border-2 border-gray-400 rounded-lg">
                <select
                  id="gender"
                  className="block px-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                >
                  <option selected className="relative">
                    Choose a gender
                  </option>
                  <option value="1">male</option>
                  <option value="2">Female</option>
                </select>
                <BsChevronDown className="absolute right-3 top-[30%] text-gray-600" />
              </div>
              <div className="relative border-2 border-gray-400 rounded-lg">
                <select
                  id="gender"
                  className="block px-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                >
                  <option selected className="relative">
                    Choose a permission
                  </option>
                  <option value="1">User</option>
                  <option value="2">Inspection</option>
                  <option value="3">Admin</option>
                </select>
                <BsChevronDown className="absolute right-3 top-[30%] text-gray-600" />
              </div>
            </div>
          </div>

          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Add
            </button>
            <button
              type="button"
              onClick={props.onClose}
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddModal
