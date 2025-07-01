'use client'
import Link from 'next/link'
import { Table, Space, Button, Modal, Form, Input, message, Popconfirm } from 'antd'
import { BookOutlined, ReadOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons'
import { useState, useEffect, useRef } from 'react'
import { addCourse, deleteCourse, updateCourse } from '../../utils/courseService'
import PaymentModal from './Paymentmodal'

import '../styles/content.scss'

const Content = ({ data = [], refreshData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [plusCourse, setPlusCourse] = useState([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const drawerRef = useRef()
  const [isPayModalOpen, setIsPayModalOpen] = useState(false)

  const handleDeleteCourse = async (id) => {
    try {
      await deleteCourse(id)
      message.success('Deleted!')
      refreshData()
    } catch (err) {
      message.error('Failed to delete!')
    }
  }

  const handleAddOrUpdateCourse = async (values) => {
    try {
      if (isEditing) {
        await updateCourse(editId, values)
        message.success('Course updated successfully!')
      } else {
        await addCourse(values)
        message.success('Course added successfully!')
      }
      setIsModalOpen(false)
      form.resetFields()
      setIsEditing(false)
      setEditId(null)
      refreshData()
    } catch (err) {
      message.error(err.message || 'Error occurred while saving!')
    }
  }

  const handleEdit = (record) => {
    form.setFieldsValue(record)
    setIsModalOpen(true)
    setIsEditing(true)
    setEditId(record.id)
  }

  const handleSave = (record) => {
    if (!plusCourse.find((course) => course.id === record.id)) {
      const updatedCourses = [...plusCourse, record]
      setPlusCourse(updatedCourses)
      localStorage.setItem('plusCourse', JSON.stringify(updatedCourses))
      message.success('Save Success')
    } else {
      message.info('Course already saved')
    }
  }

  const handleRemoveSavedCourse = (id) => {
    const updated = plusCourse.filter((course) => course.id !== id)
    setPlusCourse(updated)
    localStorage.setItem('plusCourse', JSON.stringify(updated))
    message.success('Removed from saved list')
  }

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  useEffect(() => {
    const savedCourses = localStorage.getItem('plusCourse')
    if (savedCourses) {
      setPlusCourse(JSON.parse(savedCourses))
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsDrawerOpen(false)
      }
    }
    if (isDrawerOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDrawerOpen])

  const columns = [
    {
      title: 'Course name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/main/viewcourse?id=${record.id}`}> View </Link>{' '}
          <a style={{ color: 'green' }} onClick={() => handleEdit(record)}>
            Update{' '}
          </a>{' '}
          <Popconfirm
            title="Are you sure to delete this course?"
            onConfirm={() => handleDeleteCourse(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <a style={{ color: 'red' }}> Delete </a>{' '}
          </Popconfirm>{' '}
          <a>
            <PlusOutlined onClick={() => handleSave(record)} />{' '}
          </a>{' '}
        </Space>
      ),
    },
  ]

  const totalPrice = plusCourse.reduce((sum, course) => sum + (course.price || 0), 0)
  return (
    <div style={{ padding: 24, background: '#fff', borderRadius: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true)
            setIsEditing(false)
            form.resetFields()
          }}
        >
          Add{' '}
        </Button>{' '}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <ReadOutlined
            className="showCourseIcon"
            onClick={toggleDrawer}
            style={{ fontSize: 25, cursor: 'pointer' }}
          />{' '}
          {plusCourse.length > 0 && <span className="badge"> {plusCourse.length} </span>}{' '}
        </div>{' '}
      </div>{' '}
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
        style={{ marginTop: 16 }}
      />{' '}
      <div className="overview-stats">
        <div className="stat-box stat-box-enrolled">
          <div className="icon"> 👑 </div>{' '}
          <div>
            <h2> {data.length} </h2> <p> Enrolled Courses </p>{' '}
          </div>{' '}
        </div>{' '}
        <div className="stat-box stat-box-lessons">
          <div className="icon"> 📚 </div>{' '}
          <div>
            <h2> {data.length * 5} </h2> <p> Lessons </p>{' '}
          </div>{' '}
        </div>{' '}
        <div className="stat-box stat-box-certificates">
          <div className="icon"> 🎓 </div>{' '}
          <div>
            <h2> {Math.floor(data.length / 2)} </h2> <p> Certificates </p>{' '}
          </div>{' '}
        </div>{' '}
      </div>{' '}
      <Modal
        title={isEditing ? 'Update Course' : 'Add New Course'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddOrUpdateCourse} autoComplete="off">
          <Form.Item
            name="name"
            label="Course Name"
            rules={[{ required: true, message: 'Please input the course name!' }]}
          >
            <Input placeholder="e.g., JavaScript for Beginners" />
          </Form.Item>{' '}
          <Form.Item
            name="duration"
            label="Duration (in hours)"
            rules={[{ required: true, message: 'Please input duration!' }]}
          >
            <Input placeholder="e.g., 6" />
          </Form.Item>{' '}
          <Form.Item
            name="level"
            label="Level"
            rules={[{ required: true, message: 'Please select a level!' }]}
          >
            <Input placeholder="e.g., beginner" />
          </Form.Item>{' '}
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <Input.TextArea
              rows={3}
              placeholder="e.g., This course teaches the basics of JavaScript"
            />
          </Form.Item>{' '}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {' '}
              {isEditing ? 'Update' : 'Submit'}{' '}
            </Button>{' '}
            <Button style={{ marginLeft: 8 }} onClick={() => setIsModalOpen(false)}>
              Cancel{' '}
            </Button>{' '}
          </Form.Item>{' '}
        </Form>{' '}
      </Modal>{' '}
      <div ref={drawerRef} className={`saved-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>
            <BookOutlined style={{ marginRight: 8 }} /> Your Cart{' '}
          </h3>{' '}
          <CloseOutlined
            onClick={() => setIsDrawerOpen(false)}
            style={{ cursor: 'pointer', fontSize: 18 }}
          />{' '}
        </div>{' '}
        {plusCourse.length === 0 ? (
          <p> No Course Was Add. </p>
        ) : (
          <>
            <ul className="cart-course-list">
              {' '}
              {plusCourse.map((course) => (
                <li key={course.id} className="cart-course">
                  <img
                    src={course.imageUrl || 'https://via.placeholder.com/90x80'}
                    alt={course.name}
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/90x80')}
                  />{' '}
                  <div className="cart-course-content">
                    <h3> {course.name} </h3> <p> {(course.price || 0).toLocaleString('vi-VN')}$ </p>
                    <button
                      className="button-remove"
                      onClick={() => handleRemoveSavedCourse(course.id)}
                    >
                      <CloseOutlined /> Delete{' '}
                    </button>{' '}
                  </div>{' '}
                </li>
              ))}{' '}
            </ul>{' '}
            <div className="cart-footer">
              <div className="cart-total">
                <p> Price </p> <h2> {totalPrice}$ </h2>{' '}
              </div>{' '}
              <div className="cart-actions">
                <Button className="action-view-cart"> Cart </Button>{' '}
                <Button
                  onClick={() => setIsPayModalOpen(true)}
                  className="action-pay"
                  type="primary"
                >
                  Pay{' '}
                </Button>{' '}
              </div>{' '}
            </div>{' '}
          </>
        )}{' '}
      </div>{' '}
      <PaymentModal
        visible={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
        totalPrice={totalPrice}
      />
    </div>
  )
}

export default Content
