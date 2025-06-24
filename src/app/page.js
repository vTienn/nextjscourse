"use client"

import Content from "../components/Content"
import { useEffect, useState } from "react"

import Head from "next/head"
import { getCourse } from "../../utils/courseService"

export default function Home() {
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

  return (
    <>
      <Head>
        <title> Khóa học lập trình | Nền tảng học online chất lượng </title>{" "}
        <meta
          name='description'
          content='Khám phá các khóa học lập trình mới nhất, học online dễ hiểu, thực tế và hiệu quả.'
        />
        <meta name='robots' content='index, follow' />
        <meta
          name='keywords'
          content='khóa học lập trình, học online, khóa học web, JavaScript, React, Next.js'
        />
        <meta property='og:title' content='Khóa học lập trình online chất lượng cao' />
        <meta
          property='og:description'
          content='Danh sách khóa học thực chiến, cập nhật liên tục cho người mới bắt đầu và nâng cao.'
        />
        <meta property='og:image' content='' />
        <meta property='og:url' content='' />
        <meta property='og:type' content='website' />
      </Head>{" "}
      <Content data={courses} refreshData={fetchCourses} />{" "}
    </>
  )
}
