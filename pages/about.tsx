import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { MainLayout } from '@/components/Layout'
import { AdminLayout } from '@/components/Layout/admin'

// const Header = dynamic(() => import('@/components/common/Header'), { ssr: false })

export interface AboutPageProps {}

export default function AboutPage(props: AboutPageProps) {
  const router = useRouter()

  const page = Number(router.query?.page)

  console.log('router', router.query)

  useEffect(() => {
    if (!page) return
    ;(async () => {
      const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`)
      const data: { data: any[] } = await response.json()
      console.log('data', data)
    })()
  }, [page])

  console.log(router.query)

  return (
    <div>
      <h1>AboutPage</h1>
      {/* <Header /> */}
      <button
        onClick={() => {
          router.push(
            {
              pathname: '/about',
              query: {
                page: (Number(page) || 1) + 1,
              },
            },
            undefined,
            { shallow: true }
          )
        }}
      >
        page + 1
      </button>
    </div>
  )
}

// attack mainlayout 
AboutPage.Layout = AdminLayout

export const getStaticProps: GetStaticProps<AboutPageProps> = async (
  context: GetStaticPropsContext
) => {
  console.log('getStaticProps')

  return {
    props: {},
  }
}

// export async function getServerSideProps() {
//   return {
//     props: {},
//   }
// }
