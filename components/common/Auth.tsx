import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/dist/client/router'
import * as React from 'react'
import { useEffect } from 'react'

export interface IAuthProps {
  children: React.ReactNode
}

export function Auth({ children }: IAuthProps) {
  const { profile, firstLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!firstLoading && !profile?.username) router.push('/login')
  }, [router, profile, firstLoading])
  if (!profile?.username) return <p>Loading...</p>
  return <div>{children}</div>
}
