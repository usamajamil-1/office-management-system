import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Login from './pages/auth/Login'
import Dashboard from './pages/dashboard/Dashboard'
import Employees from './pages/employees/Employees'
import MainLayout from './layouts/MainLayout'
import Attendance from './pages/attendance/Attendance'
import Leave from './pages/leave/Leave'
import Payroll from './pages/payroll/Payroll'
import Tasks from './pages/tasks/Tasks'
import AttendanceHistory from './pages/attendance/AttendanceHistory'
import ApplyLeave from './pages/leave/ApplyLeave'
import ProtectedRoute from './components/common/ProtectedRoute'
import AddTask from './pages/tasks/AddTask'
import Expenses from './pages/expenses/Expenses'
import AddExpense from './pages/expenses/AddExpense'
import Inventory from './pages/inventory/Inventory'
import AddItem from './pages/inventory/AddItem'
import Reports from './pages/reports/Reports'
import Announcements from './pages/announcements/Announcements'
import AddAnnouncements from './pages/announcements/AddAnnouncements'
import AddEmployee from './pages/employees/AddEmployee'
import Profile from './pages/profile/Profile'
import AccountSettings from './pages/profile/AccountSettings'
import MyTasks from './pages/tasks/MyTasks'
import Recruitment from './pages/recruitment/Recruitment'
import AddPayroll from './pages/payroll/AddPayroll'
import AddApplication from './pages/recruitment/AddApplication'
import AddVacancy from './pages/recruitment/AddVacancy'
import AddInterview from './pages/recruitment/AddInterview'



function App() {

  useEffect(() => {
    fetch('https://office-management-system-backend-m7u3.onrender.com')
      .catch(() => {});
  }, []);

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['admin', 'hr', 'employee', 'accountant']}>  <MainLayout>   <Dashboard />   </MainLayout> </ProtectedRoute>} />
        <Route path="/employees" element={<ProtectedRoute allowedRoles={['admin', 'hr', 'employee']}> <MainLayout>   <Employees />   </MainLayout> </ProtectedRoute>} />
        <Route path="/attendance" element={<ProtectedRoute allowedRoles={['admin', 'hr', 'employee']}> <MainLayout>  <Attendance />  </MainLayout> </ProtectedRoute>} />
        <Route path="/leave" element={<ProtectedRoute allowedRoles={['admin', 'hr', 'employee']}> <MainLayout>       <Leave />       </MainLayout> </ProtectedRoute>} />
        <Route path="/applyLeave" element={<ProtectedRoute allowedRoles={['admin', 'hr', 'employee']}> <MainLayout>       <ApplyLeave />       </MainLayout> </ProtectedRoute>} />
        <Route path="/payroll" element={<ProtectedRoute allowedRoles={['admin', 'hr']}> <MainLayout>     <Payroll />     </MainLayout> </ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute allowedRoles={['admin', 'hr', 'employee']}> <MainLayout>       <Tasks />       </MainLayout> </ProtectedRoute>} />
        <Route path='/attendanceHistory' element={<ProtectedRoute allowedRoles={['admin', 'hr', 'employee']}> <MainLayout> <AttendanceHistory /> </MainLayout> </ProtectedRoute>} />
        <Route path='/addTask' element={<ProtectedRoute allowedRoles={['admin', 'hr', 'employee']}> <MainLayout> <AddTask /> </MainLayout> </ProtectedRoute>} />
        <Route path='/expenses' element={<ProtectedRoute allowedRoles={['admin', 'accountant']}> <MainLayout> <Expenses /> </MainLayout> </ProtectedRoute>} />
        <Route path='/addExpense' element={<ProtectedRoute allowedRoles={['admin', 'accountant']}> <MainLayout> <AddExpense /> </MainLayout> </ProtectedRoute>} />
        <Route path='/inventory' element={<ProtectedRoute allowedRoles={['admin', 'accountant']}> <MainLayout> <Inventory /> </MainLayout> </ProtectedRoute>} />
        <Route path='/addItem' element={<ProtectedRoute allowedRoles={['admin', 'accountant']}> <MainLayout> <AddItem /> </MainLayout> </ProtectedRoute>} />
        <Route path='/reports' element={<ProtectedRoute allowedRoles={['admin', 'accountant']}> <MainLayout> <Reports /> </MainLayout> </ProtectedRoute>} />
        <Route path='/announcements' element={<ProtectedRoute allowedRoles={['admin', 'hr', 'employee', 'accountant']}> <MainLayout> <Announcements /> </MainLayout> </ProtectedRoute>} />
        <Route path='/addAnnouncements' element={<ProtectedRoute allowedRoles={['admin', 'hr', 'employee', 'accountant']}> <MainLayout> <AddAnnouncements /> </MainLayout> </ProtectedRoute>} />
        <Route path='/addEmployee' element={<ProtectedRoute allowedRoles={['admin', 'hr','employee']}> <MainLayout> <AddEmployee /> </MainLayout> </ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute allowedRoles={['admin', 'hr', 'employee']}> <MainLayout> <Profile /> </MainLayout> </ProtectedRoute>} />
        <Route path='/setting' element={<ProtectedRoute allowedRoles={['admin', 'hr']}> <MainLayout> <AccountSettings /> </MainLayout> </ProtectedRoute>} />
        <Route path='/myTasks' element={<ProtectedRoute allowedRoles={['admin', 'hr', 'employee']}> <MainLayout> <MyTasks /> </MainLayout> </ProtectedRoute>} />
        <Route path='/recruitment' element={<ProtectedRoute allowedRoles={['admin', 'hr']}> <MainLayout> <Recruitment /> </MainLayout> </ProtectedRoute>} />
        <Route path='/addPayroll' element={<ProtectedRoute allowedRoles={['admin', 'hr']}> <MainLayout> <AddPayroll /> </MainLayout> </ProtectedRoute>} />
        <Route path='/addApplication' element={<ProtectedRoute allowedRoles={['admin', 'hr']}> <MainLayout> <AddApplication /> </MainLayout> </ProtectedRoute>} />
        <Route path='/addVacancy' element={<ProtectedRoute allowedRoles={['admin', 'hr']}> <MainLayout> <AddVacancy /> </MainLayout> </ProtectedRoute>} />
        <Route path='/addInterview' element={<ProtectedRoute allowedRoles={['admin', 'hr']}> <MainLayout> <AddInterview /> </MainLayout> </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>

  )
}



export default App