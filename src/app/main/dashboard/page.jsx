"use client"
import Content from "../../../components/Content"
import { useEffect, useState } from "react"
import { getCourse } from "../../../../utils/courseService"

export default function Dashboard() {
  const [courses, setCourses] = useState([])

  const fetchCourses = async () => {
    try {
      const data = await getCourse()
      const sorted = data.sort((a, b) => b.id - a.id)
      setCourses(sorted)
    } catch (error) {
      console.error("Fetch failed", error)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  return <Content data={courses} refreshData={fetchCourses} />
}
