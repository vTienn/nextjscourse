// app/page.jsx hoặc src/app/page.jsx
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/login') // 👉 Tự động chuyển sang trang đăng nhập
}
