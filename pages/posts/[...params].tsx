import { useRouter } from 'next/dist/client/router'
import * as React from 'react'

export interface ParamsPageProps {}

export default function Params(props: ParamsPageProps) {
  const router = useRouter()
  return (
    <div>
      <h1>ParamsPage</h1>
      <p>{JSON.stringify(router.query)}</p>
    </div>
  )
}
