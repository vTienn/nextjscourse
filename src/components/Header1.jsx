"use client";
import { useState, useEffect } from "react";
import "../styles/header.scss";
import { Avatar } from "antd";
import { RadarChartOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function Header1() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <header className="header">
      <div className="logo">
        <RadarChartOutlined />
        <span style={{ marginLeft: 8 }}> TienDevFE </span>{" "}
      </div>{" "}
      <div className="actions">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="theme-btn"
        >
          {" "}
          {isDarkMode ? "☀️" : "🌙"}{" "}
        </button>{" "}
        <Avatar size={36} src="/download.jpg" style={{ margin: "0 8px" }} />{" "}
        <div className="username"> VieTien </div>{" "}
      </div>{" "}
    </header>
  );
}
