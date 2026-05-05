import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
import PayrollDetail from './pages/payroll/PayrollDetail'
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




function App() {
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
        <Route path='/attendanceHistory' element={<ProtectedRoute allowedRoles={['admin', 'hr', 'employee']}> <MainLayout> <AttendanceHistory /> </MainLayout> </ProtectedRoute>}></Route>
        <Route path='/payrollDetail' element={<ProtectedRoute allowedRoles={['admin', 'hr']}> <MainLayout> <PayrollDetail /> </MainLayout> </ProtectedRoute>}></Route>
        <Route path='/addTask' element={<ProtectedRoute allowedRoles={['admin', 'hr', 'employee']}> <MainLayout> <AddTask /> </MainLayout> </ProtectedRoute>}></Route>
        <Route path='/expenses' element={<ProtectedRoute allowedRoles={['admin', 'accountant']}> <MainLayout> <Expenses /> </MainLayout> </ProtectedRoute>}></Route>
        <Route path='/addExpense' element={<ProtectedRoute allowedRoles={['admin', 'accountant']}> <MainLayout> <AddExpense /> </MainLayout> </ProtectedRoute>}></Route>
        <Route path='/inventory' element={<ProtectedRoute allowedRoles={['admin', 'accountant']}> <MainLayout> <Inventory /> </MainLayout> </ProtectedRoute>}></Route>
        <Route path='/addItem' element={<ProtectedRoute allowedRoles={['admin', 'accountant']}> <MainLayout> <AddItem /> </MainLayout> </ProtectedRoute>}></Route>
        <Route path='/reports' element={<ProtectedRoute allowedRoles={['admin', 'accountant']}> <MainLayout> <Reports /> </MainLayout> </ProtectedRoute>}></Route>
        <Route path='/announcements' element={<ProtectedRoute allowedRoles={['admin', 'hr', 'employee', 'accountant']}> <MainLayout> <Announcements /> </MainLayout> </ProtectedRoute>}></Route>
        <Route path='/addAnnouncements' element={<ProtectedRoute allowedRoles={['admin', 'hr', 'employee', 'accountant']}> <MainLayout> <AddAnnouncements /> </MainLayout> </ProtectedRoute>}></Route>
        <Route path='/addEmployee' element={<ProtectedRoute allowedRoles={['admin', 'hr']}> <MainLayout> <AddEmployee /> </MainLayout> </ProtectedRoute>}></Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App