import authApi from '@/api-client/auth-api'
import * as React from 'react'

export interface ILoginPageProps {}

export default function LoginPage(props: ILoginPageProps) {
  async function handleLoginClick() {
    try {
      await authApi.postLogin({ username: 'viet', password: '234324234' })
    } catch (error) {
      console.log('log failed', error)
    }
  }
  async function handleGetProfileClick() {
    try {
      await authApi.getProfile()
    } catch (error) {
      console.log('log failed', error)
    }
  }
  async function handleLogoutClick() {
    try {
      await authApi.postLogout()
    } catch (error) {
      console.log('log failed', error)
    }
  }

  return (
    <div>
      <h1>LoginPage</h1>

      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleGetProfileClick}>get Profile</button>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  )
}
