import React, { useState, useEffect } from 'react'
import StatCard from '@/components/common/StatCard'
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { attendanceData } from '@/data/chartData'
import { User, UserCheck, UserMinus, ClipboardList, Megaphone } from 'lucide-react'
import { employeeStructureData } from '@/data/EmployeeStructureData'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { companyPayData } from '@/data/CompanyPayData'
import { performanceData } from '@/data/performanceData'
import { CheckCircle2, UserPlus, Plus } from 'lucide-react'

const Dashboard = () => {

  const [stats, setStats] = useState({ totalEmployees: 0, presentToday: 0, onLeave: 0, pendingTasks: 0 })
  const [taskList, setTaskList] = useState([])
  const [applications, setApplications] = useState([])
  const [interviews, setInterviews] = useState([])

  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const fetchDashboardData = async () => {
    try {
      const [statsRes, tasksRes, appsRes, interviewsRes] = await Promise.all([
       fetch('https://office-management-system-backend-m7u3.onrender.com/api/reports/dashboard', { headers: { authorization: token } }),
        fetch('https://office-management-system-backend-m7u3.onrender.com/api/task', { headers: { authorization: token } }),
       fetch('https://office-management-system-backend-m7u3.onrender.com/api/recruitment/applications', { headers: { authorization: token } }),
        fetch('https://office-management-system-backend-m7u3.onrender.com/api/recruitment/interviews', { headers: { authorization: token } }),
      ])

      const statsData = await statsRes.json()
      const tasksData = await tasksRes.json()
      const appsData = await appsRes.json()
      const interviewsData = await interviewsRes.json()

      setStats(statsData.stats || {})
      setTaskList(tasksData.task || [])
      setApplications((appsData.applications || []).slice(0, 5))
      setInterviews((interviewsData.interviews || []).slice(0, 5))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDashboardData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className='flex flex-col gap-6'>

      {/* section-1 — Stat Cards (real data) */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-center'>
        <StatCard title="Total Employees" value={stats.totalEmployees} icon={User} iconBg="bg-blue-50" iconColor="text-blue-500" />
        <StatCard title="Present Today" value={stats.presentToday} icon={UserCheck} iconBg="bg-green-50" iconColor="text-green-500" />
        <StatCard title="On leave" value={stats.onLeave} icon={UserMinus} iconBg="bg-amber-50" iconColor="text-amber-500" />
        <StatCard title="Pending Tasks" value={stats.pendingTasks} icon={ClipboardList} iconBg="bg-purple-50" iconColor="text-purple-500" />
      </div>

      {/* section-2 — Charts (in ka backend abhi nahi bana, static data hai) */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-white rounded-lg p-4 shadow-sm'>
          <h2 className='text-lg font-semibold mb-4'>Attendance Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="present" fill="#316AFF" />
              <Bar dataKey="absent" fill="#FF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className='bg-white rounded-lg p-4 shadow-sm'>
          <h2 className='text-lg font-semibold mb-4'>Employee Structure</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={employeeStructureData} dataKey='value' cx="50%" cy="50%" innerRadius={60} outerRadius={80}>
                {employeeStructureData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <ul className='mt-3'>
            {employeeStructureData.map((item, index) => (
              <li key={index} className='flex items-center gap-2 text-sm'>
                <div className='flex items-center gap-2'>
                  <span className='w-2.5 h-2.5 rounded-full' style={{ background: item.color }}></span>
                  <span className='text-gray-600'>{item.name}</span>
                </div>
                <span className='font-semibold text-gray-800'>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* section-3 — Add Announcement banner */}
      <div className='bg-white rounded-lg p-4 shadow-sm flex flex-wrap justify-between items-center'>
        <div className='flex flex-wrap items-center gap-3'>
          <div className='bg-blue-100 p-2 rounded-lg'>
            <Megaphone size={22} className='text-blue-600' />
          </div>
          <div>
            <h2 className='text-lg font-semibold mb-1'>Create Announcement</h2>
            <p className='text-sm font-light'>Make an announcement to your employees quickly</p>
          </div>
        </div>
        <Button onClick={() => navigate('/addAnnouncements')}>
          <Plus size={16} /> Create Now
        </Button>
      </div>

      {/* section-4 — Job Applications (real) + Company Pay (static) */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>

        <div className='bg-white shadow-sm rounded-lg p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='font-medium'>Recent Job Applications</h2>
            <Link to='/recruitment' className='text-sm text-blue-600'>View All</Link>
          </div>
          <ul>
            {applications.map((app) => (
              <li key={app._id}>
                <div className='flex items-center justify-between'>
                  <div className='flex gap-3 mt-3 items-center'>
                    <div className='text-sm text-center rounded-full p-2 bg-blue-100 text-blue-600'>{getInitials(app.name)}</div>
                    <div className='flex flex-col'>
                      <span className='font-medium'>{app.name}</span>
                      <span className='font-light text-sm'>{app.role}</span>
                    </div>
                  </div>
                  <div className={`text-xs font-semibold px-2 py-0.5 rounded-full
                    ${app.status === 'Pending' ? 'bg-amber-50 text-amber-600' : ''}
                    ${app.status === 'Approved' ? 'bg-green-50 text-green-600' : ''}
                    ${app.status === 'Rejected' ? 'bg-red-50 text-red-500' : ''}`}>
                    {app.status}
                  </div>
                </div>
              </li>
            ))}
            {applications.length === 0 && <p className='text-sm text-gray-400 text-center mt-4'>No applications found</p>}
          </ul>
        </div>

        <div className='bg-white rounded-lg p-4 shadow-sm'>
          <h2 className='text-lg font-semibold mb-4'>Company Pay</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={companyPayData} dataKey='value' cx="50%" cy="50%" innerRadius={60} outerRadius={80}>
                {companyPayData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <ul className='mt-3'>
            {companyPayData.map((item, index) => (
              <li key={index} className='flex items-center gap-2 text-sm'>
                <div className='flex items-center gap-2'>
                  <span className='w-2.5 h-2.5 rounded-full' style={{ background: item.color }}></span>
                  <span className='text-gray-600'>{item.name}</span>
                </div>
                <span className='font-semibold text-gray-800'>{item.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* section-5 — Task Update (real) + Performance (static) */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>

        <div className='bg-white rounded-lg p-4 shadow-sm'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-lg font-semibold'>Task Update</h2>
            <Link to='/tasks' className='text-sm text-blue-600'>View All</Link>
          </div>
          <ul className='space-y-3'>
            {taskList.slice(0, 5).map((task) => (
              <li key={task._id} className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <CheckCircle2 size={16} className={task.status === 'completed' ? 'text-green-500' : 'text-gray-400'} />
                  <span className={`text-sm ${task.status === 'completed' ? 'line-through text-gray-300' : 'text-gray-600'}`}>
                    {task.title}
                  </span>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
                 ${task.status === 'completed' ? 'bg-green-50 text-green-600' : ''}
                 ${task.status === 'inProgress' ? 'bg-yellow-50 text-yellow-600' : ''}
                 ${task.status === 'pending' ? 'bg-red-50 text-red-500' : ''}`}>
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
          {taskList.length === 0 && <p className='text-sm text-gray-400 text-center mt-4'>No tasks found</p>}
        </div>

        <div className='bg-white rounded-lg p-4 shadow-sm'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-lg font-semibold'>Employee Performance</h2>
            <span className='text-xs text-gray-400'>Last Month</span>
          </div>
          <ul className='space-y-4'>
            {performanceData.map((emp, index) => (
              <li key={index}>
                <div className='flex items-center justify-between mb-1'>
                  <div className='flex items-center gap-2'>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${emp.color}`}>
                      {emp.initials}
                    </div>
                    <div>
                      <p className='text-sm font-semibold text-gray-800'>{emp.name}</p>
                      <p className='text-xs text-gray-400'>{emp.role}</p>
                    </div>
                  </div>
                  <span className='text-sm font-bold text-gray-700'>{emp.score}%</span>
                </div>
                <div className='h-1.5 bg-gray-100 rounded-full overflow-hidden'>
                  <div className='h-full rounded-full bg-blue-500' style={{ width: `${emp.score}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* section-6 — Interview Schedule (real) + Add Employee banner */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>

        <div className='bg-white rounded-lg p-4 shadow-sm'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-lg font-semibold'>Interview Schedule</h2>
            <Link to='/recruitment' className='text-xs text-blue-600'>View All</Link>
          </div>
          <ul className='space-y-3'>
            {interviews.map((item) => (
              <li key={item._id} className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-purple-100 text-purple-600'>
                    {getInitials(item.application?.name)}
                  </div>
                  <div>
                    <p className='text-sm font-semibold text-gray-800'>{item.application?.name}</p>
                    <p className='text-xs text-gray-400'>{item.application?.role}</p>
                  </div>
                </div>
                <span className='text-xs font-semibold text-gray-500'>{new Date(item.time).toLocaleString()}</span>
              </li>
            ))}
            {interviews.length === 0 && <p className='text-sm text-gray-400 text-center mt-4'>No interviews scheduled</p>}
          </ul>
        </div>

        <div className='bg-white rounded-lg p-4 shadow-sm flex flex-col gap-3 justify-center items-center'>
          <div className='flex items-center gap-3'>
            <div className='bg-green-100 p-2 rounded-lg'>
              <UserPlus size={22} className='text-green-600' />
            </div>
            <div>
              <h2 className='text-lg font-semibold text-gray-800 mb-1'>Add Employee</h2>
              <p className='text-sm text-gray-600'>Add a new member to your team</p>
            </div>
          </div>
          <Button onClick={() => navigate('/addEmployee')}>Add Now</Button>
        </div>
      </div>

    </div>
  )
}

export default Dashboard