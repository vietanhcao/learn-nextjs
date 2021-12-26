import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import * as React from 'react'

export interface PostDetailPageProps {
  post: any
}

export default function PostListPage({post}: PostDetailPageProps) {
  const router = useRouter()

  if(!post) return null
  return (
    <div>
      <h1>PostDetailPage</h1>
      <p>{post.title}</p>
      <p>{post.description}</p>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  console.log('/getStaticPaths')
  const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
  let data: { data: any[] } = await response.json()

  return {
    paths: data.data.map((post) => ({ params: { postId: post.id } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<PostDetailPageProps> = async (
  context: GetStaticPropsContext
) => {
  console.log('/getStaticPaths', context.params?.postId)

  const postId = context.params?.postId
  if (!postId) return { notFound: true }
  // server-side "Call"
  //build-time
  // node js cando anything
  // await new Promise((resolve) => setTimeout(resolve, 5000))
  const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`)
  const data: { data: any[] } = await response.json()


  return {
    props: {
      post: data,
    },
  }
}
