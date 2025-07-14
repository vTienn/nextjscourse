import { Suspense } from 'react'
import ViewCourse from './ViewCourse'

export default function Page() {
  return (
    <Suspense fallback={<div> Loading... </div>}>
      {' '}
      <ViewCourse />
    </Suspense>
  )
}
