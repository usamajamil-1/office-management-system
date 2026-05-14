import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Bell } from 'lucide-react'
import { User,ListTodo,Settings,ChevronDown } from 'lucide-react'

const Navbar = ({ onMenuClick }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const userEmail = localStorage.getItem('userEmail')
    const role = localStorage.getItem('role')

    const pageTitles = {
        '/dashboard': 'Dashboard',
        '/employees': 'Employees',
        '/attendance': 'Attendance',
        '/payroll': 'Payroll',
        '/leave': 'Leave',
        '/tasks': 'Tasks',
        '/attendanceHistory': 'Attendance History',
        '/applyLeave': 'Apply Leave',
        '/payrollDetail': 'Payroll Detail',
        '/addTask': 'Add Task',
        '/expenses': 'Expenses',
        '/addExpense': 'Add Expense',
        '/inventory': 'Inventory',
        '/addItem': 'Add Item',
        '/reports': 'Reports',
        '/announcements': 'Announcements',
        '/addAnnouncements': 'AddAnnouncements',
        '/addEmployee': 'AddEmployee'
    }

    return (
        <div className='flex justify-between border-b items-center  p-2 px-3 bg-white shadow-sm '>
            <button onClick={onMenuClick} className='md:hidden text-xl'>☰</button>
            <h1 className='text-xl font-semibold'>{pageTitles[location.pathname]}</h1>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className='flex items-center gap-2 cursor-pointer'>
                        
                        <div className='hidden md:block'>
                            <p className='text-sm font-medium text-gray-800'>{userEmail}</p>
                            <div className='flex gap-2 items-center'>
                                 <p className='text-xs text-gray-500'>{role}</p>
                                <span className='text-gray-500 '> <ChevronDown size={15}/> </span>
                            </div>
                           
                        </div>
                    

                        <div className='w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold'>
                            {userEmail?.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={()=> navigate('/profile')} className='font-extralight'> <User/> View Profile </DropdownMenuItem>
                    <DropdownMenuItem  onClick={()=> navigate('/myTasks')} className='font-extralight'> <ListTodo/> My Task </DropdownMenuItem>
                    <DropdownMenuItem  onClick={()=> navigate('/setting')} className='font-extralight'> <Settings/> Account Setting </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                        localStorage.removeItem("isLoggedIn")
                        localStorage.removeItem('userEmail')
                        localStorage.removeItem('role')
                        navigate('/login')
                    }} className='font-extralight'>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

    )
}

export default Navbar