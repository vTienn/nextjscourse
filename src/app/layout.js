import Header1 from "@/components/Header1"
import Sidebar from "@/components/Sidebar"
import "../styles/header.scss"
import "antd/dist/reset.css"

import { Layout } from "antd"
const { Header, Sider, Content } = Layout

export const metadata = {
  title: "William | Portfolio",
  description: "Personal website"
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body style={{ margin: 0 }}>
        <Layout style={{ minHeight: "100vh" }}>
          <Header style={{ background: "#fff", padding: 0, height: 64 }}>
            <Header1 />
          </Header>{" "}
          <Layout>
            <Sider
              width={200}
              style={{
                background: "#fff",
                borderRight: "1px solid #f0f0f0",
                paddingTop: 16
              }}
            >
              <Sidebar />
            </Sider>{" "}
            <Layout style={{ padding: "24px", background: "#f5f5f5" }}>
              <Content
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                  background: "#fff"
                }}
              >
                {children}{" "}
              </Content>{" "}
            </Layout>{" "}
          </Layout>{" "}
        </Layout>{" "}
      </body>{" "}
    </html>
  )
}
