"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getCourseByID } from "../../../../utils/courseService"
import { Modal, Form, Input, DatePicker, message } from "antd"
import "../../../styles/viewcourse.scss"

const ViewCourse = () => {
  const [infoCourse, setInfoCourse] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
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
    router.push("/main/dashboard")
  }

  const handleRegister = (values) => {
    message.success("Registered successfully!")
    setIsModalOpen(false)
    form.resetFields()
    console.log("User info:", values)
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
      <div style={{ marginTop: 20 }}>
        <button className='back-btn' onClick={handleClick}>
          Back{" "}
        </button>{" "}
        <button className='register-btn' onClick={() => setIsModalOpen(true)}>
          Register{" "}
        </button>{" "}
      </div>{" "}
      <Modal
        title='Register for Course'
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout='vertical' onFinish={handleRegister} autoComplete='off'>
          <Form.Item
            label='Full Name'
            name='fullname'
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input placeholder='e.g. Nguyen Van A' />
          </Form.Item>{" "}
          <Form.Item label='Date of Birth' name='dob'>
            <DatePicker style={{ width: "100%" }} />{" "}
          </Form.Item>{" "}
          <Form.Item
            label='Phone Number'
            name='phone'
            rules={[{ required: true, message: "Please enter your phone number!" }]}
          >
            <Input placeholder='e.g. 0901234567' />
          </Form.Item>{" "}
          <Form.Item
            label='Email'
            name='email'
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Invalid email format!" }
            ]}
          >
            <Input placeholder='e.g. your@email.com' />
          </Form.Item>{" "}
          <Form.Item>
            <button type='submit' className='submit-btn'>
              Submit{" "}
            </button>{" "}
          </Form.Item>{" "}
        </Form>{" "}
      </Modal>{" "}
    </div>
  )
}

export default ViewCourse
