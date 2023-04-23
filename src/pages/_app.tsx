import "@/styles/globals.css"
import type { NextPage } from "next"
import type { AppProps } from "next/app"
import { ReactElement, ReactNode } from "react"

import DefaultLayout from "@/layouts/DefaultLayout"

import { QueryClientProvider, QueryClient } from "react-query"
// import { store } from "@/redux/store"
// import { Provider } from "react-redux"

//create a client
const queryClient = new QueryClient()

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactNode) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>)
  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      {/* <Provider store={store}>
      </Provider> */}
    </QueryClientProvider>
  )
}
