import React from 'react'

interface Props {
  children: React.ReactElement
}

export const EmptyLayout = ({ children }: Props) => {
  return <div>{children}</div>
}
