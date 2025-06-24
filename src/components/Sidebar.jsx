"use client"

import { Menu, Drawer, Button } from "antd"
import Link from "next/link"
import {
  HomeOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  PictureOutlined,
  CommentOutlined,
  MenuOutlined
} from "@ant-design/icons"
import { useState } from "react"

const items = [
  {
    key: "/",
    icon: <HomeOutlined />,
    label: <Link href='/'> Home </Link>
  },
  {
    key: "/chart",
    icon: <UserOutlined />,
    label: <Link href='/chart'> Statistic Course </Link>
  },
  {
    key: "/",
    icon: <AppstoreAddOutlined />,
    label: <Link href='/facebook'> Services </Link>
  },
  {
    key: "/",
    icon: <PictureOutlined />,
    label: <Link href='#'> My work </Link>
  },
  {
    key: "/",
    icon: <CommentOutlined />,
    label: <Link href='/insta'> Testimonials </Link>
  }
]

const Sidebar = () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <div className='sidebar-desktop'>
        <Menu
          mode='inline'
          defaultSelectedKeys={["/"]}
          style={{ height: "100%", borderRight: 0 }}
          items={items}
        />{" "}
      </div>{" "}
      <div className='sidebar-mobile'>
        <Button
          type='text'
          icon={<MenuOutlined />}
          onClick={() => setVisible(true)}
          style={{ fontSize: 24 }}
        />{" "}
        <Drawer
          title='Menu'
          placement='left'
          onClose={() => setVisible(false)}
          open={visible}
          bodyStyle={{ padding: 0 }}
        >
          <Menu
            mode='inline'
            defaultSelectedKeys={["/"]}
            style={{ height: "100%" }}
            items={items}
            onClick={() => setVisible(false)}
          />{" "}
        </Drawer>{" "}
      </div>{" "}
    </>
  )
}

export default Sidebar
