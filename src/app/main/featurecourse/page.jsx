'use client'

import { useState, useEffect } from 'react'
import { getCourse } from '../../../../utils/courseService'
import { Col, Row, Button, Modal, Pagination } from 'antd'
import '../../../styles/featurecourse.scss'
import {
  ClockCircleOutlined,
  CalendarOutlined,
  UsergroupAddOutlined,
  PlayCircleOutlined,
  FormOutlined,
} from '@ant-design/icons'

const COURSES_PER_PAGE = 6

// ✅ Hàm chuyển link YouTube sang định dạng embed
const getEmbeddedYouTubeUrl = (url) => {
  try {
    const parsed = new URL(url)
    const hostname = parsed.hostname

    if (hostname.includes('youtube.com')) {
      const videoId = parsed.searchParams.get('v')
      return `https://www.youtube.com/embed/${videoId}`
    }

    if (hostname.includes('youtu.be')) {
      const videoId = parsed.pathname.split('/')[1]
      return `https://www.youtube.com/embed/${videoId}`
    }

    return ''
  } catch (e) {
    return ''
  }
}

const FeatureCourse = () => {
  const [featureCourse, setFeatureCourse] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState('')

  useEffect(() => {
    const fetchApi = async () => {
      const data = await getCourse()
      const filterdata = data.filter((course) => course.imageUrl && course.imageUrl !== '')
      setFeatureCourse(filterdata)
    }
    fetchApi()
  }, [])

  const openModal = (videoUrl) => {
    setSelectedVideo(videoUrl)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedVideo('')
  }

  // Phân trang
  const indexOfLastCourse = currentPage * COURSES_PER_PAGE
  const indexOfFirstCourse = indexOfLastCourse - COURSES_PER_PAGE
  const currentCourses = featureCourse.slice(indexOfFirstCourse, indexOfLastCourse)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="feature-course" style={{ padding: '20px' }}>
      <h2> Featured Courses </h2>{' '}
      <div className="course-box">
        {' '}
        {currentCourses.length > 0 ? (
          <Row gutter={[16, 16]}>
            {' '}
            {currentCourses.map((course) => (
              <Col xs={24} sm={12} md={8} className="box-detail-course" key={course.id}>
                <div
                  style={{
                    border: '1px solid #e8e8e8',
                    borderRadius: '8px',
                    padding: '16px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    marginBottom: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '300px',
                  }}
                >
                  <div>
                    <img
                      src={course.imageUrl}
                      alt={course.name}
                      style={{
                        width: '100%',
                        borderRadius: '8px',
                        height: '200px',
                        objectFit: 'cover',
                        marginBottom: '10px',
                      }}
                    />{' '}
                    <h3 style={{ marginBottom: '8px' }}> {course.name} </h3>{' '}
                    <div style={{ fontSize: '14px', color: '#777', marginBottom: '10px' }}>
                      {' '}
                      {course.duration && (
                        <p style={{ margin: '4px 0', display: 'flex', alignItems: 'center' }}>
                          <ClockCircleOutlined style={{ marginRight: '5px' }} />
                          Duration: {course.duration}{' '}
                        </p>
                      )}{' '}
                      {course.startdate && (
                        <p style={{ margin: '4px 0', display: 'flex', alignItems: 'center' }}>
                          <CalendarOutlined style={{ marginRight: '5px' }} />
                          Start Date: {course.startdate}{' '}
                        </p>
                      )}{' '}
                      {course.studentcount && (
                        <p style={{ margin: '4px 0', display: 'flex', alignItems: 'center' }}>
                          <UsergroupAddOutlined style={{ marginRight: '5px' }} />
                          Students: {course.studentcount}{' '}
                        </p>
                      )}{' '}
                    </div>{' '}
                  </div>{' '}
                  <p style={{ color: '#555', marginTop: 'auto', marginBottom: '15px' }}>
                    {' '}
                    {course.description}{' '}
                  </p>{' '}
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                    <Button
                      type="primary"
                      icon={<FormOutlined />}
                      style={{ flex: 1 }}
                      onClick={() => alert(`Registering for ${course.name}`)}
                    >
                      Register{' '}
                    </Button>{' '}
                    {course.videoUrl && (
                      <Button
                        icon={<PlayCircleOutlined />}
                        style={{ flex: 1 }}
                        onClick={() => openModal(course.videoUrl)}
                      >
                        Demo{' '}
                      </Button>
                    )}{' '}
                  </div>{' '}
                </div>{' '}
              </Col>
            ))}{' '}
          </Row>
        ) : (
          <p> No course available </p>
        )}
        {/* Phân trang */}{' '}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Pagination
            current={currentPage}
            total={featureCourse.length}
            pageSize={COURSES_PER_PAGE}
            onChange={handlePageChange}
            showSizeChanger={false}
          />{' '}
        </div>{' '}
      </div>
      {/* Modal Video Demo */}{' '}
      <Modal title="Course Demo" open={isModalOpen} onCancel={closeModal} footer={null} width={800}>
        {' '}
        {selectedVideo ? (
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
            <iframe
              src={getEmbeddedYouTubeUrl(selectedVideo)}
              title="Course Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            ></iframe>{' '}
          </div>
        ) : (
          <p> No video available </p>
        )}{' '}
      </Modal>{' '}
    </div>
  )
}

export default FeatureCourse
