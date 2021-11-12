import { useRouter } from 'next/dist/client/router'
import * as React from 'react'

export interface PostDetailPageProps {}

export default function PostListPage(props: PostDetailPageProps) {
  const router = useRouter()
  return (
    <div>
      <h1>PostDetailPage</h1>
      <p>{JSON.stringify(router.query)}</p>
    </div>
  )
}
