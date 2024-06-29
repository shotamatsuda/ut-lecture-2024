import { Ion } from '@cesium/engine'
import { type AppProps } from 'next/app'
import Head from 'next/head'
import { type FC } from 'react'

import './styles.css'

declare global {
  interface Window {
    CESIUM_BASE_URL?: string
  }
}

if (typeof window !== 'undefined') {
  window.CESIUM_BASE_URL = '/cesium'
}

// https://github.com/Project-PLATEAU/plateau-streaming-tutorial/blob/main/terrain/plateau-terrain-streaming.md
Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5N2UyMjcwOS00MDY1LTQxYjEtYjZjMy00YTU0ZTg5MmViYWQiLCJpZCI6ODAzMDYsImlhdCI6MTY0Mjc0ODI2MX0.dkwAL1CcljUV7NA7fDbhXXnmyZQU_c-G5zRx8PtEcxE'

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>U-Tokyo Lecture 2024 / Cesium</title>
    </Head>
    <Component {...pageProps} />
  </>
)

export default App
