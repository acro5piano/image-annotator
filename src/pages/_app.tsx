import 'src/globals.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { OG } from 'src/utils/og'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{OG.title}</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
export default MyApp