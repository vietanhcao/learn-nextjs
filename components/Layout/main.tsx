import { LayoutProps } from '@/models/index'
import * as React from 'react'
import Link from 'next/link'

export interface MainLayoutProps {}

export function MainLayout({ children }: LayoutProps) {

  React.useEffect(() => {
    console.log('mounting children');
    
    return () => {
      console.log('unmounting');
      
    }
  }, [])
  return (
    <div>
      <h1>MainLayout</h1>
      <Link href="/">
        <a>Home</a>
      </Link>

      <Link href="/about">
        <a>About</a>
      </Link>

      <div>{children}</div>
    </div>
  )
}
