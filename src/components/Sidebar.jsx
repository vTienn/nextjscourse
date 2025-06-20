"use client";

import { Menu } from "antd";
import Link from "next/link";
import {
  HomeOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  PictureOutlined,
  CommentOutlined,
} from "@ant-design/icons";

const items = [
  {
    key: "/",
    icon: <HomeOutlined />,
    label: <Link href="/"> Home </Link>,
  },
  {
    key: "/about",
    icon: <UserOutlined />,
    label: <Link href="#"> About me </Link>,
  },
  {
    key: "/facebook",
    icon: <AppstoreAddOutlined />,
    label: <Link href="/facebook"> Services </Link>,
  },
  {
    key: "/work",
    icon: <PictureOutlined />,
    label: <Link href="#"> My work </Link>,
  },
  {
    key: "/insta",
    icon: <CommentOutlined />,
    label: <Link href="/insta"> Testimonials </Link>,
  },
];

const Sidebar = () => {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["/"]}
      style={{ height: "100%", borderRight: 0 }}
      items={items}
    />
  );
};

export default Sidebar;
