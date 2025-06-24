import Header1 from "@/components/Header1"
import Sidebar from "@/components/Sidebar"
import "../styles/siderbar.scss"
import "../styles/header.scss" // bạn có thể để CSS riêng cho layout
import { MenuOutlined } from "@ant-design/icons"
export const metadata = {
  title: "VieTie | CourseOn",
  description: "My Website"
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body style={{ margin: 0 }}>
        <div className='app-layout'>
          <header className='app-header'>
            <Header1 />
          </header>{" "}
          <div className='app-body'>
            <aside className='app-sidebar'>
              <Sidebar />
            </aside>{" "}
            <main className='app-content'> {children} </main>{" "}
          </div>{" "}
        </div>{" "}
      </body>{" "}
    </html>
  )
}
