import { Head, Html, Main, NextScript } from 'next/document'
import { OG } from 'src/utils/og'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content={OG.description} />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />

        <meta property="og:title" content={OG.title} />
        <meta property="og:description" content={OG.description} />
        <meta property="og:site_name" content="Image Annotator" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://image-annotator.com" />
        <meta
          property="og:image"
          content="https://image-annotator.com/og.png"
        />
        <meta property="og:image:alt" content={OG.title} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://image-annotator.com/og.png"
        />
        <meta name="twitter:site" content="@acro5piano" />
        <meta name="twitter:title" content={OG.title} />
        <meta name="twitter:description" content={OG.description} />
        <meta name="twitter:creator" content="@acro5piano" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-BC8E2GS7SX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                  window.dataLayer = window.dataLayer || []
                  function gtag() {
                    dataLayer.push(arguments)
                  }
                  gtag('js', new Date())
                  gtag('config', 'G-BC8E2GS7SX')
                  `,
          }}
        />
        <title>{OG.title}</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
