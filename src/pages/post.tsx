import Pagination from "@/feature/Home/components/Pagination"
import SideBar from "@/layouts/SideBar"
import { getPost } from "@/lib/helper"
import Link from "next/link"
import React from "react"

type Props = {
  posts: any
  currentPage: any
  totalPages: any
  category: any
}

const PostsPage = ({ posts, currentPage, totalPages, category }: Props) => {
  return (
    <div className="bg-white flex-1">
      <div className="grid grid-cols-10 space-x-8 pt-4 container mx-auto scrollbar-style ">
        <div className="col-span-10 lg:col-span-7 mb-4   bg-white  shadow-xl h-fit">
          {category && (
            <div className="border-l-4 border-l-green-600 my-2 bg-white w-full shadow-lg">
              {" "}
              <h1 className="text-green-600 capitalize font-bold text-lg p-2">
                {category}
              </h1>
            </div>
          )}
          <div className="border-t-4 border-t-[#049803] mt-2 pt-2">
            {posts.map((post: any) => (
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
                <div className="w-44 h-44 shrink-0">
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
                  <span className=" text-gray-500 text-xl">
                    {post.createdAt.substring(0, 10)}
                  </span>
                </div>
                <hr className="h-2 text-gray-500" />
              </Link>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            category={category}
          />
        </div>
        <SideBar />
      </div>
    </div>
  )
}

export async function getServerSideProps({ query }: any) {
  const currentPage = parseInt(query.page) || 1
  let category = query.category || null
  let posts
  if (category) {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: category,
    }
    const response = await fetch(`http://localhost:3000/api/post/view`, Options)
    posts = await response.json()
  } else {
    posts = await getPost()
  }

  const postsPerPage = 10 // Số lượng bài viết trên mỗi trang
  const totalPages = Math.ceil(posts.length / postsPerPage)

  return {
    props: {
      posts: posts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
      ),
      currentPage,
      totalPages,
      category,
    },
  }
}

export default PostsPage
