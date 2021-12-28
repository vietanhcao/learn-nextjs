import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { EmptyLayout } from '@/components/Layout'
import { AppPropsWithLayout } from '../models'
import { SWRConfig } from 'swr'
import axiosClient from '@/api-client/axios-client'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout

  return (
    <SWRConfig
      value={{
        fetcher: (url) => axiosClient.get(url), //get from url
        shouldRetryOnError: false, //try when error
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  )
}

export default MyApp
