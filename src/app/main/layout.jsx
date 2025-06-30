import Header1 from "@/components/Header1"
import Sidebar from "@/components/Sidebar"
import "@/styles/siderbar.scss"
import "@/styles/header.scss"

export default function MainLayout({ children }) {
  return (
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
    </div>
  )
}
