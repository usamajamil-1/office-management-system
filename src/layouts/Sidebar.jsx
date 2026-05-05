import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Sidebar = ({ isOpen, onClose }) => {

    const role = localStorage.getItem('role')

    const location = useLocation()

    return (
        <>


            <div className={`bg-gray-900 w-64 min-h-screen p-4 fixed md:static top-0 left-0 z-50 ${isOpen ? 'block' : 'hidden'} md:block`}>

                <div className='text-white font-bold text-lg '> Office Management </div>
                <div className='flex flex-col mt-6 gap-3 text-gray-400'>

                    {(role === 'admin' || role === 'hr' || role === 'employee' || role === 'accountant') && (
                        <Link onClick={onClose} to={"/dashboard"} className={location.pathname === '/dashboard' ? 'text-white' : 'hover:text-white'}>Dashboard</Link>
                    )}

                    {(role === 'admin' || role === 'hr' || role === 'employee' ) && (
                        <Link onClick={onClose} to={"/employees"} className={location.pathname === '/employees' ? 'text-white' : 'hover:text-white'}>Employees</Link>
                    )}

                     {(role === 'admin' || role === 'hr'  ) && (
                        <Link onClick={onClose} to={"/addEmployee"} className={location.pathname === '/addEmployee' ? 'text-white' : 'hover:text-white'}>Add Employees</Link>
                    )}

                    {(role === 'admin' || role === 'hr' || role === 'employee') && (
                        <Link onClick={onClose} to={"/attendance"} className={location.pathname === '/attendance' ? 'text-white' : 'hover:text-white'}>Attendance</Link>
                    )}

                    {(role === 'admin' || role === 'hr' || role === 'employee') && (
                        <Link onClick={onClose} to={"/attendanceHistory"} className={location.pathname === '/attendanceHistory' ? 'text-white' : 'hover:text-white'}>Attendance History</Link>

                    )}


                    {(role === 'admin' || role === 'accountant') && (
                        <Link onClick={onClose} to={"/payroll"} className={location.pathname === '/payroll' ? 'text-white' : 'hover:text-white'}>Payroll</Link>

                    )}

                    {(role === 'admin' || role === 'accountant') && (
                        <Link onClick={onClose} to={"/payrollDetail"} className={location.pathname === '/payrollDetail' ? 'text-white' : 'hover:text-white'}>Payroll Detail</Link>

                    )}


                    {(role === 'admin' || role === 'hr' || role === 'employee') && (
                        <Link onClick={onClose} to={"/leave"} className={location.pathname === '/leave' ? 'text-white' : 'hover:text-white'}>Leave</Link>
                    )}

                    {(role === 'admin' || role === 'hr' || role === 'employee') && (
                        <Link onClick={onClose} to={"/applyLeave"} className={location.pathname === '/applyLeave' ? 'text-white' : 'hover:text-white'}>Apply Leave</Link>

                    )}

                    {(role === 'admin' || role === 'hr' || role === 'employee') && (
                        <Link onClick={onClose} to={"/tasks"} className={location.pathname === '/tasks' ? 'text-white' : 'hover:text-white'}>Tasks</Link>

                    )}

                    {(role === 'admin' || role === 'hr' || role === 'employee') && (
                        <Link onClick={onClose} to={"/addTask"} className={location.pathname === '/addTask' ? 'text-white' : 'hover:text-white'}>Add Task</Link>

                    )}

                    {(role === 'admin' || role === 'accountant') && (
                        <Link onClick={onClose} to={"/expenses"} className={location.pathname === '/expenses' ? 'text-white' : 'hover:text-white'}>Expenses</Link>

                    )}

                    {(role === 'admin' || role === 'accountant') && (
                        <Link onClick={onClose} to={"/addExpense"} className={location.pathname === '/addExpense' ? 'text-white' : 'hover:text-white'}>Add Expense</Link>

                    )}

                    {(role === 'admin' || role === 'accountant') && (
                        <Link onClick={onClose} to={"/inventory"} className={location.pathname === '/inventory' ? 'text-white' : 'hover:text-white'}>Inventory</Link>

                    )}

                    {(role === 'admin' || role === 'accountant') && (
                        <Link onClick={onClose} to={"/addItem"} className={location.pathname === '/addItem' ? 'text-white' : 'hover:text-white'}>Add Item</Link>

                    )}

                    {(role === 'admin' || role === 'accountant') && (
                        <Link onClick={onClose} to={"/reports"} className={location.pathname === '/reports' ? 'text-white' : 'hover:text-white'}>Reports</Link>

                    )}

                    {(role === 'admin' || role === 'hr' || role === 'employee' || role === 'accountant') && (
                        <Link onClick={onClose} to={"/announcements"} className={location.pathname === '/announcements' ? 'text-white' : 'hover:text-white'}>Announcements</Link>

                    )}

                    {(role === 'admin' || role === 'hr' || role === 'employee' || role === 'accountant') && (
                        <Link onClick={onClose} to={"/addAnnouncements"} className={location.pathname === '/addAnnouncements' ? 'text-white' : 'hover:text-white'}>Add Announcements</Link>

                    )}


                </div>
            </div>

        </>
    )
}

export default Sidebar