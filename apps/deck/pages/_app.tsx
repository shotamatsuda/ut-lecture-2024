import { type AppProps } from 'next/app'
import Head from 'next/head'
import { type FC } from 'react'

import './styles.css'

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>U-Tokyo Lecture 2024 / Deck</title>
    </Head>
    <Component {...pageProps} />
  </>
)

export default App
