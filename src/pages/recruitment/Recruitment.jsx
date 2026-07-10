import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import StatCard from '@/components/common/StatCard'
import { Users, UserCheck, UserX, Clock, Briefcase, Pencil, Trash2 } from 'lucide-react'

const Recruitment = () => {

  const [applications, setApplications] = useState([])
  const [interviews, setInterviews] = useState([])
  const [vacancies, setVacancies] = useState([])
  const [editApplication, setEditApplication] = useState(null)
  const [editVacancy, setEditVacancy] = useState(null)
  const token = localStorage.getItem('token')

  const fetchAll = async () => {
    try {
      const [appsRes, interviewsRes, vacanciesRes] = await Promise.all([
        fetch('https://office-management-system-backend-m7u3.onrender.com/api/recruitment/applications', { headers: { authorization: token } }),
        fetch('https://office-management-system-backend-m7u3.onrender.com/api/recruitment/interviews', { headers: { authorization: token } }),
        fetch('https://office-management-system-backend-m7u3.onrender.com/api/recruitment/vacancies', { headers: { authorization: token } }),
      ])

      const appsData = await appsRes.json()
      const interviewsData = await interviewsRes.json()
      const vacanciesData = await vacanciesRes.json()

      setApplications(appsData.applications || [])
      setInterviews(interviewsData.interviews || [])
      setVacancies(vacanciesData.vacancies || [])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const accepted = applications.filter(a => a.status === 'Approved').length
  const rejected = applications.filter(a => a.status === 'Rejected').length
  const pending  = applications.filter(a => a.status === 'Pending').length

  const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  // ---- Application actions ----
  const deleteApplication = async (id) => {
    try {
      await fetch(`https://office-management-system-backend-m7u3.onrender.com/api/recruitment/applications/${id}`, {
        method: 'DELETE',
        headers: { authorization: token }
      })
      fetchAll()
    } catch (error) {
      console.log(error)
    }
  }

  const saveApplicationEdit = async () => {
    try {
      await fetch(`https://office-management-system-backend-m7u3.onrender.com/api/recruitment/applications/${editApplication._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', authorization: token },
        body: JSON.stringify(editApplication)
      })
      setEditApplication(null)
      fetchAll()
    } catch (error) {
      console.log(error)
    }
  }

  // ---- Vacancy actions ----
  const deleteVacancy = async (id) => {
    try {
      await fetch(`https://office-management-system-backend-m7u3.onrender.com/api/recruitment/vacancies/${id}`, {
        method: 'DELETE',
        headers: { authorization: token }
      })
      fetchAll()
    } catch (error) {
      console.log(error)
    }
  }

  const saveVacancyEdit = async () => {
    try {
      await fetch(`https://office-management-system-backend-m7u3.onrender.com/api/recruitment/vacancies/${editVacancy._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', authorization: token },
        body: JSON.stringify(editVacancy)
      })
      setEditVacancy(null)
      fetchAll()
    } catch (error) {
      console.log(error)
    }
  }

  // ---- Interview actions ----
  const deleteInterview = async (id) => {
    try {
      await fetch(`https://office-management-system-backend-m7u3.onrender.com/api/recruitment/interviews/${id}`, {
        method: 'DELETE',
        headers: { authorization: token }
      })
      fetchAll()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col gap-6'>

      {/* Row 1 — Stat Cards */}
      <div className='grid grid-cols-2 lg:grid-cols-5 gap-4'>
        <StatCard title='Total Applications' value={applications.length} icon={Users}      iconBg='bg-blue-50'   iconColor='text-blue-500'   />
        <StatCard title='Accepted'           value={accepted}            icon={UserCheck}  iconBg='bg-green-50'  iconColor='text-green-500'  />
        <StatCard title='Rejected'           value={rejected}            icon={UserX}      iconBg='bg-red-50'    iconColor='text-red-500'    />
        <StatCard title='Pending'            value={pending}             icon={Clock}      iconBg='bg-amber-50'  iconColor='text-amber-500'  />
        <StatCard title='Vacancies'          value={vacancies.length}    icon={Briefcase}  iconBg='bg-purple-50' iconColor='text-purple-500' />
      </div>

      {/* Row 2 — Applications + Interview */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>

        {/* Job Applications */}
        <Card className='p-4'>
          <CardContent className='p-0'>
            <h2 className='font-semibold mb-4'>Job Applications</h2>
            <ul className='space-y-3'>
              {applications.map((app) => (
                <li key={app._id} className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold bg-blue-100 text-blue-600'>
                      {getInitials(app.name)}
                    </div>
                    <div>
                      <p className='text-sm font-semibold text-gray-800'>{app.name}</p>
                      <p className='text-xs text-gray-400'>{app.role}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
                      ${app.status === 'Pending'  ? 'bg-amber-50 text-amber-600' : ''}
                      ${app.status === 'Approved' ? 'bg-green-50 text-green-600' : ''}
                      ${app.status === 'Rejected' ? 'bg-red-50 text-red-500'    : ''}
                    `}>
                      {app.status}
                    </span>
                    <Button size='sm' variant='ghost' onClick={() => setEditApplication(app)}>
                      <Pencil size={14} />
                    </Button>
                    <Button size='sm' variant='ghost' onClick={() => deleteApplication(app._id)}>
                      <Trash2 size={14} className='text-red-500' />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Interview Schedule */}
        <Card className='p-4'>
          <CardContent className='p-0'>
            <h2 className='font-semibold mb-4'>Interview Schedule</h2>
            <ul className='space-y-3'>
              {interviews.map((item) => (
                <li key={item._id} className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold bg-purple-100 text-purple-600'>
                      {getInitials(item.application?.name)}
                    </div>
                    <div>
                      <p className='text-sm font-semibold text-gray-800'>{item.application?.name}</p>
                      <p className='text-xs text-gray-400'>{item.application?.role}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-xs font-semibold text-gray-500'>
                      {new Date(item.time).toLocaleString()}
                    </span>
                    <Button size='sm' variant='ghost' onClick={() => deleteInterview(item._id)}>
                      <Trash2 size={14} className='text-red-500' />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

      </div>

      {/* Row 3 — Vacancies */}
      <div>
        <h2 className='font-semibold mb-4'>Current Vacancies</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {vacancies.map((vacancy) => (
            <Card key={vacancy._id} className='p-4'>
              <CardContent className='p-0'>
                <div className='flex items-start justify-between'>
                  <div>
                    <p className='font-semibold text-gray-900 mb-1'>{vacancy.title}</p>
                    <p className='text-xs text-gray-400 mb-3'>{vacancy.department}</p>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Button size='sm' variant='ghost' onClick={() => setEditVacancy(vacancy)}>
                      <Pencil size={14} />
                    </Button>
                    <Button size='sm' variant='ghost' onClick={() => deleteVacancy(vacancy._id)}>
                      <Trash2 size={14} className='text-red-500' />
                    </Button>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600'>
                    {vacancy.type}
                  </span>
                  <span className='text-xs text-gray-500'>{vacancy.openings} Openings</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Application Dialog */}
      <Dialog open={editApplication !== null} onOpenChange={() => setEditApplication(null)}>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Edit Application</DialogTitle>
          </DialogHeader>
          <Input placeholder="Candidate Name" value={editApplication?.name || ""} onChange={e => setEditApplication({ ...editApplication, name: e.target.value })} />
          <Input placeholder="Role" value={editApplication?.role || ""} onChange={e => setEditApplication({ ...editApplication, role: e.target.value })} />
          <select value={editApplication?.status || ""} onChange={e => setEditApplication({ ...editApplication, status: e.target.value })} className='border rounded-xl p-2 text-sm'>
            <option value='Pending'>Pending</option>
            <option value='Approved'>Approved</option>
            <option value='Rejected'>Rejected</option>
          </select>
          <Button onClick={saveApplicationEdit}>Save</Button>
        </DialogContent>
      </Dialog>

      {/* Edit Vacancy Dialog */}
      <Dialog open={editVacancy !== null} onOpenChange={() => setEditVacancy(null)}>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Edit Vacancy</DialogTitle>
          </DialogHeader>
          <Input placeholder="Job Title" value={editVacancy?.title || ""} onChange={e => setEditVacancy({ ...editVacancy, title: e.target.value })} />
          <Input placeholder="Department" value={editVacancy?.department || ""} onChange={e => setEditVacancy({ ...editVacancy, department: e.target.value })} />
          <select value={editVacancy?.type || ""} onChange={e => setEditVacancy({ ...editVacancy, type: e.target.value })} className='border rounded-xl p-2 text-sm'>
            <option value='Full-Time'>Full-Time</option>
            <option value='Part-Time'>Part-Time</option>
            <option value='Contract'>Contract</option>
            <option value='Internship'>Internship</option>
          </select>
          <Input type="number" placeholder="Openings" value={editVacancy?.openings ?? ""} onChange={e => setEditVacancy({ ...editVacancy, openings: e.target.value })} />
          <Button onClick={saveVacancyEdit}>Save</Button>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default Recruitment