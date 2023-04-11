import Header from "@/layouts/Header"
import React from "react"
import Footer from "../Footer"

type Props = {
  children: React.ReactNode
}

const DefaultLayout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default DefaultLayout
