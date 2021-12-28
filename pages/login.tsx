import authApi from '@/api-client/auth-api'
import * as React from 'react'
import { useAuth } from '../hooks'

export interface ILoginPageProps {}

export default function LoginPage(props: ILoginPageProps) {
  const { profile, login, logout } = useAuth({ revalidateOnMount: false })

  async function handleLoginClick() {
    try {
      await login()
    } catch (error) {
      console.log('log failed', error)
    }
  }
  // async function handleGetProfileClick() {
  //   try {
  //     await authApi.getProfile()
  //   } catch (error) {
  //     console.log('log failed', error)
  //   }
  // }
  async function handleLogoutClick() {
    try {
      await logout()
    } catch (error) {
      console.log('log failed', error)
    }
  }

  return (
    <div>
      <h1>LoginPage</h1>
      <p>Profile: {JSON.stringify(profile || {}, null, 4)}</p>

      <button onClick={handleLoginClick}>Login</button>
      {/* <button onClick={handleGetProfileClick}>get Profile</button> */}
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  )
}
