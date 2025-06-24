"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getCourseByID } from "../../../utils/courseService"
import "../../styles/viewcourse.scss"

const ViewCourse = () => {
  const [infoCourse, setInfoCourse] = useState([])
  const router = useRouter()
  const searchParam = useSearchParams()
  const id = searchParam.get("id")

  useEffect(() => {
    const fetchApi = async () => {
      if (!id) return
      const data = await getCourseByID(id)
      setInfoCourse(data)
    }
    fetchApi()
  }, [id])

  const handleClick = () => {
    router.push("/")
  }

  return (
    <div className='course-detail-container'>
      <h1> View Course </h1>{" "}
      {infoCourse.length > 0 && (
        <div className='course-info'>
          <span>
            <strong> Course Name: </strong> {infoCourse[0].name}{" "}
          </span>{" "}
          <span>
            <strong> Duration: </strong> {infoCourse[0].duration}{" "}
          </span>{" "}
          <span>
            <strong> Level: </strong> {infoCourse[0].level}{" "}
          </span>{" "}
          <span>
            <strong> Description: </strong> {infoCourse[0].description}{" "}
          </span>{" "}
        </div>
      )}{" "}
      <button className='back-btn' onClick={handleClick}>
        Back{" "}
      </button>{" "}
    </div>
  )
}

export default ViewCourse
