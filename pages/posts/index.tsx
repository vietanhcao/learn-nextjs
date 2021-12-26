import { GetStaticProps, GetStaticPropsContext } from 'next'
import Link from 'next/Link'
import * as React from 'react'

export interface PostListPageProps {
  posts: any[]
}

export default function PostListPage(props: PostListPageProps) {
  return (
    <div>
      <h1>PostListPage</h1>

      <ul>
        {props.posts.map((e) => (
          <li key={e.id}>
            <Link href={`/posts/${e.id}`}>{e.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps<PostListPageProps> = async (
  context: GetStaticPropsContext
) => {
  // server-side "Call"
  //build-time
  // node js cando anything
  // await new Promise((resolve) => setTimeout(resolve, 5000))
  const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
  const data: { data: any[] } = await response.json()

  console.log('getStaticProps', data)

  return {
    props: {
      posts: data.data.map((o) => ({ id: o.id, title: o.title })),
    },
  }
}
