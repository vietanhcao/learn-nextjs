import { useRouter } from 'next/dist/client/router'
import * as React from 'react'

export interface AboutPageProps {}

export default function AboutPage(props: AboutPageProps) {
  const router = useRouter()

  console.log(router.query)

  return <div>AboutPage</div>
}

export async function getServerSideProps() {
  return {
    props: {},
  }
}
