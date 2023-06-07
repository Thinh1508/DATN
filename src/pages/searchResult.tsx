import SideBar from "@/layouts/SideBar"
import { getPostSearch } from "@/lib/helper"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

type Props = {
  data: any
}

const SearchResult = (props: Props) => {
  const router = useRouter()
  const { key } = router.query
  console.log(key)
  return (
    <div className="bg-white flex-1 text-gray-900">
      <div className="grid grid-cols-10 space-x-8 pt-4 container mx-auto scrollbar-style ">
        <div className="col-span-10 lg:col-span-7 mb-4 bg-white  shadow-xl h-fit">
          <div className="border-t-4 border-t-[#049803] mt-2 pt-2 text-gray-950 px-2">
            <div className="flex items-baseline mb-2">
              <h1 className="shrink-0 text-green-700 text-xl font-semibold">
                Từ khóa:
              </h1>
              <p className="ml-2 break-words line-clamp-2 text-lg">{key}</p>
            </div>
            <hr className="h-0.5 bg-gray-300" />
          </div>
          <div className="flex items-end mx-2 p-2 mt-4 gap-4 text-lg font-medium bg-slate-300">
            <h1 className="cursor-pointer hover:text-red-600">Bài viết</h1>
            <h1 className="cursor-pointer opacity-40 hover:text-red-600 hover:opacity-100">
              Cơ sở khi doanh
            </h1>
          </div>
          <div className="border border-t-2  border-slate-300 mx-2 mb-4 rounded-sm shadow-md">
            <div className="border border-slate-300 rounded-sm shadow-md m-1">
              {props.data &&
                props.data.map((post: any) => (
                  <Link
                    href={{
                      pathname: "/postDetail",
                      query: {
                        idPost: post._id,
                        category: post.category,
                      },
                    }}
                    className="flex flex-row gap-2 w-full border-b-2"
                    key={post._id}
                  >
                    <div className="w-20 h-20 shrink-0">
                      <img
                        src={post.background}
                        alt=""
                        className="w-full h-full p-2"
                      />
                    </div>
                    <div className="flex-1 pr-4 relative py-1">
                      <h1 className="text-[#049803] break-words font-semibold text-2xl relative line-clamp-2 cursor-pointer">
                        {post.title}
                      </h1>
                    </div>
                    <hr className="h-2 text-gray-500" />
                  </Link>
                ))}
            </div>
          </div>
        </div>
        <SideBar />
      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const data = await getPostSearch(context.query.key.toUpperCase())
  return { props: { data } }
}

export default SearchResult
