'use client'

import { useState, useEffect } from 'react'
import '../styles/header.scss'
import { Avatar } from 'antd'
import { RadarChartOutlined, LogoutOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'

export default function Header1() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [dataLoc, setDataLoc] = useState(null)
  const router = useRouter()

  // Lấy dữ liệu user từ localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          const parsedData = JSON.parse(storedUser)
          setDataLoc(parsedData)
          console.log('User:', parsedData)
        } catch (error) {
          console.error('Lỗi parse JSON:', error)
        }
      }
    }
  }, [])

  // Toggle Dark Mode
  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  // Chuyển về trang dashboard
  const handleClicktoHome = () => {
    router.push('/main/dashboard')
  }

  // Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  return (
    <header className="header">
      <div className="logo" onClick={handleClicktoHome}>
        <RadarChartOutlined />
        <span style={{ marginLeft: 8 }}>TienDevFe</span>
      </div>

      <div className="actions">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="theme-btn"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>

        <Avatar
          size={36}
          src="/download.jpg"
          style={{ margin: '0 8px' }}
        />

        <div className="username">
          {dataLoc?.yourname || 'VieTien'}
          <LogoutOutlined
            onClick={handleLogout}
            style={{ marginLeft: 8, cursor: 'pointer' }}
          />
        </div>
      </div>
    </header>
  )
}
