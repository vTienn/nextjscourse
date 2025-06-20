"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Content from "../components/Content";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
export default function Home() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const FetchApi = async () => {
      const result = await fetch("http://localhost:4000/courses");
      const data = await result.json();
      console.log(data);
      setCourses(data);
    };
    FetchApi();
  }, []);
  return (
    <>
      <Content data={courses} />{" "}
    </>
  );
}
