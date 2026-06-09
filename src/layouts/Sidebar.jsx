import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { LayoutDashboard } from 'lucide-react'
import { User } from 'lucide-react'
import { DollarSign } from 'lucide-react'
import { Settings } from 'lucide-react'
import { Megaphone } from 'lucide-react'
import { UserPlus } from 'lucide-react'

const Sidebar = ({ isOpen, onClose }) => {

    const role = localStorage.getItem('role')

    const location = useLocation()

    const [openMenu, setOpenMenu] = useState(null)

    return (
        <>


            <div className={`bg-[#0f172a] w-64 min-h-screen border-r border-gray-200 fixed md:static top-0 left-0 z-50 ${isOpen ? 'block' : 'hidden'} md:block overflow-y-auto  `}>
                <div className='text-white font-bold text-lg mt-4 text-center '> Office Management </div>

                <div className='flex justify-center'>


                    <div className='flex flex-col  mt-6 gap-4 text-gray-600'>

                        <div >
                            <div className=' border-white/10 rounded p-2 cursor-pointer text-white shadow-black/20 shadow-md '>
                                <div className='flex justify-between ' onClick={() => setOpenMenu(openMenu === 'dashboard' ? null : 'dashboard')}>
                                    <LayoutDashboard size={20}/>  <span>Dashboard</span> <ChevronDown size={20}/> 
                                </div>
                            </div>

                            {openMenu === 'dashboard' && (
                                <div className='flex flex-col gap-2 mt-2 '>
                                    {(role === 'admin' || role === 'hr' || role === 'employee' || role === 'accountant') && (
                                        <Link onClick={onClose} to={"/dashboard"} className={location.pathname === '/dashboard' ? 'text-blue-400' : 'hover:text-white'}>Dashboard</Link>
                                    )}
                                    
                                </div>
                            )}


                        </div>



                        <div>
                            <div className=' border-white/10 shadow-black/20 shadow-md rounded p-2 cursor-pointer  text-white '>
                                <div className='flex gap-2 item-center justify-between' onClick={() => setOpenMenu(openMenu === 'HrManagement' ? null : 'HrManagement')}>
                                    <User size={20}/>   <span>HR Management</span> <ChevronDown className='ms-2' size={20}/> 
                                </div>
                            </div>

                            {openMenu === 'HrManagement' && (
                                <div className='flex flex-col gap-2   mt-2 '>
                                    {(role === 'admin' || role === 'hr' || role === 'employee') && (
                                        <Link onClick={onClose} to={"/employees"} className={location.pathname === '/employees' ? 'text-blue-400 ' : 'hover:text-white'}>Employees</Link>
                                    )}

                                    {(role === 'admin' || role === 'hr') && (
                                        <Link onClick={onClose} to={"/addEmployee"} className={location.pathname === '/addEmployee' ? 'text-blue-400' : 'hover:text-white'}>Add Employees</Link>
                                    )}

                                    {(role === 'admin' || role === 'hr' || role === 'employee') && (
                                        <Link onClick={onClose} to={"/attendance"} className={location.pathname === '/attendance' ? 'text-blue-400' : 'hover:text-white'}>Attendance</Link>
                                    )}

                                    {(role === 'admin' || role === 'hr' || role === 'employee') && (
                                        <Link onClick={onClose} to={"/attendanceHistory"} className={location.pathname === '/attendanceHistory' ? 'text-blue-400' : 'hover:text-white'}>Attendance History</Link>
                                    )}

                                    {(role === 'admin' || role === 'hr' || role === 'employee') && (
                                        <Link onClick={onClose} to={"/leave"} className={location.pathname === '/leave' ? 'text-blue-400' : 'hover:text-white'}>Leave</Link>
                                    )}

                                    {(role === 'admin' || role === 'hr' || role === 'employee') && (
                                        <Link onClick={onClose} to={"/applyLeave"} className={location.pathname === '/applyLeave' ? 'text-blue-400' : 'hover:text-white'}>Apply Leave</Link>

                                    )}

                                </div>
                            )}


                        </div>


                        <div>
                            <div className='  border-white/10 shadow-black/20 shadow-md  rounded p-2 cursor-pointer  text-white'>
                                <div className='flex justify-between' onClick={() => setOpenMenu(openMenu === 'finance' ? null : 'finance')}>
                                <DollarSign size={20}/>   <span>Finance</span> <ChevronDown size={20}/> 
                                </div>
                            </div>

                            {openMenu === 'finance' && (
                                <div className='flex flex-col  gap-2 mt-2 '>

                                    {(role === 'admin' || role === 'accountant') && (
                                        <Link onClick={onClose} to={"/payroll"} className={location.pathname === '/payroll' ? 'text-blue-400' : 'hover:text-white'}>Payroll</Link>

                                    )}

                                    {(role === 'admin' || role === 'accountant') && (
                                        <Link onClick={onClose} to={"/payrollDetail"} className={location.pathname === '/payrollDetail' ? 'text-blue-400' : 'hover:text-white'}>Payroll Detail</Link>

                                    )}
                                    {(role === 'admin' || role === 'accountant') && (
                                        <Link onClick={onClose} to={"/expenses"} className={location.pathname === '/expenses' ? 'text-blue-400' : 'hover:text-white'}>Expenses</Link>

                                    )}

                                    {(role === 'admin' || role === 'accountant') && (
                                        <Link onClick={onClose} to={"/addExpense"} className={location.pathname === '/addExpense' ? 'text-blue-400' : 'hover:text-white'}>Add Expense</Link>

                                    )}
                                    {(role === 'admin' || role === 'accountant') && (
                                        <Link onClick={onClose} to={"/reports"} className={location.pathname === '/reports' ? 'text-blue-400' : 'hover:text-white'}>Reports</Link>

                                    )}


                                </div>
                            )}


                        </div>


                        <div>
                            <div className='  border-white/10 shadow-black/20 shadow-md  rounded p-2 cursor-pointer  text-white'>
                                <div className='flex justify-between' onClick={() => setOpenMenu(openMenu === 'management' ? null : 'management')}>
                                <Settings  size={20}/> <span>Management</span> <ChevronDown size={20}/> 
                                </div>
                            </div>

                            {openMenu === 'management' && (
                                <div className='flex flex-col gap-2  mt-2'>
                                    {(role === 'admin' || role === 'hr' || role === 'employee') && (
                                        <Link onClick={onClose} to={"/tasks"} className={location.pathname === '/tasks' ? 'text-blue-400' : 'hover:text-white'}>Tasks</Link>

                                    )}

                                    {(role === 'admin' || role === 'hr' || role === 'employee') && (
                                        <Link onClick={onClose} to={"/addTask"} className={location.pathname === '/addTask' ? 'text-blue-400' : 'hover:text-white'}>Add Task</Link>

                                    )}

                                    {(role === 'admin' || role === 'accountant') && (
                                        <Link onClick={onClose} to={"/inventory"} className={location.pathname === '/inventory' ? 'text-blue-400' : 'hover:text-white'}>Inventory</Link>

                                    )}

                                    {(role === 'admin' || role === 'accountant') && (
                                        <Link onClick={onClose} to={"/addItem"} className={location.pathname === '/addItem' ? 'text-blue-400' : 'hover:text-white'}>Add Item</Link>

                                    )}

                                </div>
                            )}

                        </div>



                        <div>
                            <div className=' border-white/10 shadow-black/20 shadow-md  rounded p-2 cursor-pointer  text-white'>
                                <div className='flex justify-between' onClick={() => setOpenMenu(openMenu === 'general' ? null : 'general')}>
                                <Megaphone size={20}/> <span>General</span> <ChevronDown size={20}/> 
                                </div>
                            </div>

                            {openMenu === 'general' && (
                                <div className='flex flex-col gap-2 mt-2 '>
                                    {(role === 'admin' || role === 'hr' || role === 'employee' || role === 'accountant') && (
                                        <Link onClick={onClose} to={"/announcements"} className={location.pathname === '/announcements' ? 'text-blue-400' : 'hover:text-white'}>Announcements</Link>

                                    )}

                                    {(role === 'admin' || role === 'hr' || role === 'employee' || role === 'accountant') && (
                                        <Link onClick={onClose} to={"/addAnnouncements"} className={location.pathname === '/addAnnouncements' ? 'text-blue-400' : 'hover:text-white'}>Add Announcements</Link>

                                    )}
                                </div>
                            )}

                        </div>




                        <div>
                            <div className=' border-white/10 shadow-black/20 shadow-md  rounded p-2 cursor-pointer  text-white'>
                                <div className='flex justify-between' onClick={() => setOpenMenu(openMenu === 'recruitment' ? null : 'recruitment')}>
                                <UserPlus size={20}/> <span>Recruitment</span> <ChevronDown size={20}/> 
                                </div>
                            </div>

                            {openMenu === 'recruitment' && (
                                <div className='flex flex-col gap-2 mt-2 '>
                                    {(role === 'admin' || role === 'hr' || role === 'employee' || role === 'accountant') && (
                                        <Link onClick={onClose} to={"/recruitment"} className={location.pathname === '/recruitment' ? 'text-blue-400' : 'hover:text-white'}>Recruitment</Link>

                                    )}
                                </div>
                            )}

                        </div>




                    </div>

                </div>
            </div>

        </>
    )
}

export default Sidebar