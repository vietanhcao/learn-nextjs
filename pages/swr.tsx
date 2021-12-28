import { StudentDetail } from '@/components/swr/StudentDetail'
import * as React from 'react'

export interface ISWRProps {}

export default function SWR(props: ISWRProps) {
  const [detailList, setDetailList] = React.useState([1, 1, 1])
  function handleAddClick() {
    setDetailList((prevList) => [...prevList, 1])
  }

  return (
    <div>
      <h1>SWR Playground</h1>
      <button onClick={handleAddClick}>add Detail</button>
      <ul>
        {detailList.map((x, index) => (
          <li key={index}>
            <StudentDetail studentId="sktwi1cgkkuif36f3" />
          </li>
        ))}
      </ul>
    </div>
  )
}
