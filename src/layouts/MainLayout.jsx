import Sidebar from '@/layouts/Sidebar'
import React from 'react'
import Navbar from '@/layouts/Navbar'
import Footer from '@/layouts/Footer'
import { SidebarProvider, useSidebar } from '@/components/ui/sidebar'

// Inner component — SidebarProvider ke andar hona chahiye
const MainLayoutInner = ({ children }) => {
  const { toggleSidebar } = useSidebar()

  return (
    <div className='flex min-h-screen w-full'>
      <Sidebar />
      <div className='flex flex-1 flex-col min-h-screen overflow-hidden'>
        <Navbar onMenuClick={toggleSidebar} />
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