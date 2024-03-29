import useSWR from 'swr'
import { PublicConfiguration } from 'swr/dist/types'
import authApi from '@/api-client/auth-api'

export function useAuth(options?: Partial<PublicConfiguration>) {
  // profile
  //
  const {
    data: profile,
    error,
    mutate,
  } = useSWR('/profile', {
    dedupingInterval: 60000,
    revalidateOnFocus: false,
    ...options,
  })

  const firstLoading = profile === undefined && error === undefined

  async function login() {
    await authApi.postLogin({ username: 'viet', password: '234324234' })
    await mutate()
  }
  async function logout() {
    await authApi.postLogout()
    mutate({}, false)
  }

  return { profile: profile as { username: string }, error, login, logout, firstLoading }
}
