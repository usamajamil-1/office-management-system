import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../components/ui/button'

const Navbar = ({onMenuClick}) => {
    const navigate = useNavigate()
    const location = useLocation()
    
    const pageTitles = {
        '/dashboard': 'Dashboard',
        '/employees': 'Employees',
        '/attendance': 'Attendance',
        '/payroll': 'Payroll',
        '/leave': 'Leave',
        '/tasks': 'Tasks',
        '/attendanceHistory' : 'Attendance History',
        '/applyLeave': 'Apply Leave',
        '/payrollDetail': 'Payroll Detail',
        '/addTask' : 'Add Task',
        '/expenses' : 'Expenses',
        '/addExpense': 'Add Expense',
        '/inventory': 'Inventory',
        '/addItem' : 'Add Item',
        '/reports' : 'Reports',
        '/announcements': 'Announcements',
        '/addAnnouncements': 'AddAnnouncements',
        '/addEmployee' : 'AddEmployee'
    }

    return (
        <div className='flex justify-between border-b items-center p-2 bg-white shadow-sm '>
            <button onClick={onMenuClick} className='md:hidden text-xl'>☰</button>
            <h1 className='text-xl font-semibold'>{pageTitles[location.pathname]}</h1>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className='w-9 h-9 rounded-full bg-gray-800 text-white flex items-center justify-center cursor-pointer'>A</div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => {
                        localStorage.removeItem("isLoggedIn")
                        navigate('/login')
                    }}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
            
    )
}

export default Navbar