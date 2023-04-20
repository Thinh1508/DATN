import { useState } from "react"
import { BsArrowLeftShort } from "react-icons/bs"

type Props = {}

const SideBar = (props: Props) => {
  const [open, setOpen] = useState(true)
  return (
    <div
      className={`bg-dark-green h-screen p-5 pt-8 ${
        open ? "w-72" : "w-20"
      } duration-300 relative`}
    >
      <BsArrowLeftShort
        className={`bg-white text-dark-green text-3xl rounded-full absolute -right-3 top-9 
      border-dark-green cursor-pointer ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="inline-flex">
        <img
          src="/assets/images/logo3.png"
          className={`h-9 w-9 text-4xl rounded-full cursor-pointer block float-left mr-2 duration-500 ${
            !open && "rotate-[360deg]"
          }`}
        />
        <h1
          className={`text-white origin-left font-medium text-2xl duration-300 ${
            !open && "scale-0"
          }`}
        >
          DaNangFA
        </h1>
      </div>
    </div>
  )
}

export default SideBar
