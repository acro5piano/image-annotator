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

// <script
//   dangerouslySetInnerHTML={{
//     __html: `
//     if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
//       document.documentElement.classList.add('dark')
//     } else {
//       document.documentElement.classList.remove('dark')
//     }
// `,
//   }}
// />
