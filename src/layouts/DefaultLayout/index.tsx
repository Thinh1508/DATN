import Header from "@/layouts/Header"
import React from "react"
import Footer from "../Footer"

type Props = {
  children: React.ReactNode
}

const DefaultLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default DefaultLayout
