import React from "react"
import checkAuth from "./middleware/checkAuth"
type Props = {}

const document = (props: Props) => {
  return <div>document</div>
}

export const getServerSideProps = checkAuth(async () => {
  return {
    props: {},
  }
})

export default document
