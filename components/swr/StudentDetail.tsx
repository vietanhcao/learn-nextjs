import * as React from 'react'
import useSWR from 'swr'

export interface IStudentDetailProps {
  studentId: string
}
const MS_PER_HOUR = 60 * 60 * 1000
export function StudentDetail({ studentId }: IStudentDetailProps) {
  const { data, error, mutate, isValidating } = useSWR(`/students/${studentId}`, {
    revalidateOnFocus: false, // forcus page call
    dedupingInterval: 2000, // like throttling 2000 when use hook all app
  })
  function handleMutateClick() {
    mutate({ name: 'testtttt' }, true) // tạm thời lấy dữ liệu cũ đổ vào rồi âm thầm lấy dữ liệu từ server update lại
  }

  return (
    <div>
      Name: {data?.name || '--'}
      <button onClick={handleMutateClick}>mutate</button>{' '}
    </div>
  )
}
