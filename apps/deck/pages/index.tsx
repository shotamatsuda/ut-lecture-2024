import { type NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Main = dynamic(async () => (await import('../src/Main')).Main, {
  ssr: false
})

const Index: NextPage = () => (
  <Suspense>
    <Main />
  </Suspense>
)

export default Index
