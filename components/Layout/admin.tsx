import React from 'react'
import { Auth } from '../common/Auth'
import Link from 'next/link'
import { LayoutProps } from '@/models/common'
import { useRouter } from 'next/dist/client/router'
import { useAuth } from '@/hooks/use-auth'

export const AdminLayout = ({ children }: LayoutProps) => {
  const routes = useRouter()
  const { profile, login, logout } = useAuth({ revalidateOnMount: false })

  async function handleLogoutClick() {
    try {
      await logout()
      routes.push('/login')
    } catch (error) {
      console.log('log failed', error)
    }
  }
  return (
    <Auth>
      <h1>AdminLayout</h1>
      <div>side bar</div>
      <p>Profile: {JSON.stringify(profile || {}, null, 4)}</p>
      <button onClick={handleLogoutClick}>Logout</button>

      <Link href="/">
        <a>Home</a>
      </Link>

      <Link href="/about">
        <a>About</a>
      </Link>

      <div>{children}</div>
    </Auth>
  )
}
