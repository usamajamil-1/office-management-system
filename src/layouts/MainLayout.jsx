import Sidebar from '@/layouts/Sidebar'
import React from 'react'
import Navbar from '@/layouts/Navbar'
import Footer from '@/layouts/Footer'
import { SidebarProvider, useSidebar } from '@/components/ui/sidebar'
import { useEffect, useState } from 'react'
import socket from '@/socket'

// Inner component — SidebarProvider ke andar hona chahiye
const MainLayoutInner = ({ children }) => {
  const { toggleSidebar } = useSidebar()

  const [notification, setNotification] = useState(null)

  useEffect(() => {

    const handleNewTask = (data) => {

      console.log("Notification received:", data)

      setNotification(data)

    }

    socket.on("newTask", handleNewTask)

    return () => {
      socket.off("newTask", handleNewTask)
    }

  }, [])

  return (
    <div className='flex min-h-screen w-full'>
      <Sidebar />
      <div className='flex flex-1 flex-col min-h-screen overflow-hidden'>
        <Navbar onMenuClick={toggleSidebar} />

        {notification && (
          <div className="mx-6 mt-4 rounded-lg bg-blue-600 text-white p-4 shadow-lg flex justify-between items-center">

            <div>
              <h3 className="font-bold">
                🔔 New Task Assigned
              </h3>

              <p>{notification.title}</p>

              <p className="text-sm">
                {notification.message}
              </p>
            </div>

            <button
              onClick={() => setNotification(null)}
              className="text-xl"
            >
              ×
            </button>

          </div>
        )}

        <div className='flex-1 p-6'>
          {children}
        </div>
        <Footer />
      </div>
    </div>
  )
}

const MainLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <MainLayoutInner>
        {children}
      </MainLayoutInner>
    </SidebarProvider>
  )
}

export default MainLayout