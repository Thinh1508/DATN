import React from "react"

type Props = {}

const TopCards = (props: Props) => {
  return (
    <div className="grid lg:grid-cols-5 gap-4 pt-4">
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-center w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-gray-900 text-2xl font-bold">$7,846</p>
          <p className="text-gray-600">Daily Revenue</p>
        </div>
        <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg">
          <span className="text-green-700 text-lg">+18%</span>
        </p>
      </div>
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-center w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-gray-900 text-2xl font-bold">$7,846</p>
          <p className="text-gray-600">Daily Revenue</p>
        </div>
        <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg">
          <span className="text-green-700 text-lg">+18%</span>
        </p>
      </div>
      <div className=" bg-white flex justify-center w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-gray-900 text-2xl font-bold">$7,846</p>
          <p className="text-gray-600">Daily Revenue</p>
        </div>
        <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg">
          <span className="text-green-700 text-lg">+18%</span>
        </p>
      </div>
    </div>
  )
}

export default TopCards
