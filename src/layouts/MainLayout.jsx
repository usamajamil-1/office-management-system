import Sidebar from '@/layouts/Sidebar'
import React, { useState } from 'react'
import Navbar from '@/layouts/Navbar'
import Footer from '@/layouts/Footer'

const MainLayout = ({ children }) => {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className='flex min-h-screen'>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className='flex flex-1 flex-col min-h-screen overflow-hidden'>
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className='flex-1 p-6'>
          {children}
        </div>
        <Footer />

      </div>


    </div>
  )
}

export default MainLayout