import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { jobApplicationsData } from '@/data/JobApplicationsData'
import { interviewData } from '@/data/InterviewSchedule'
import { vacanciesData } from '@/data/vacanciesData'
import StatCard from '@/components/common/StatCard'
import { Users, UserCheck, UserX, Clock, Briefcase } from 'lucide-react'

const Recruitment = () => {

  const accepted = jobApplicationsData.filter(a => a.status === 'Approved').length
  const rejected = jobApplicationsData.filter(a => a.status === 'Rejected').length
  const pending  = jobApplicationsData.filter(a => a.status === 'Pending').length

  return (
    <div className='flex flex-col gap-6'>

      {/* Row 1 — Stat Cards */}
      <div className='grid grid-cols-2 lg:grid-cols-5 gap-4'>
        <StatCard title='Total Applications' value={jobApplicationsData.length} icon={Users}      iconBg='bg-blue-50'   iconColor='text-blue-500'   />
        <StatCard title='Accepted'           value={accepted}                   icon={UserCheck}  iconBg='bg-green-50'  iconColor='text-green-500'  />
        <StatCard title='Rejected'           value={rejected}                   icon={UserX}      iconBg='bg-red-50'    iconColor='text-red-500'    />
        <StatCard title='Pending'            value={pending}                    icon={Clock}      iconBg='bg-amber-50'  iconColor='text-amber-500'  />
        <StatCard title='Vacancies'          value={vacanciesData.length}       icon={Briefcase}  iconBg='bg-purple-50' iconColor='text-purple-500' />
      </div>

      {/* Row 2 — Applications + Interview */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>

        {/* Job Applications */}
        <Card className='p-4'>
          <CardContent className='p-0'>
            <h2 className='font-semibold mb-4'>Job Applications</h2>
            <ul className='space-y-3'>
              {jobApplicationsData.map((app) => (
                <li key={app.id} className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${app.color}`}>
                      {app.initials}
                    </div>
                    <div>
                      <p className='text-sm font-semibold text-gray-800'>{app.name}</p>
                      <p className='text-xs text-gray-400'>{app.role}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
                    ${app.status === 'Pending'  ? 'bg-amber-50 text-amber-600' : ''}
                    ${app.status === 'Approved' ? 'bg-green-50 text-green-600' : ''}
                    ${app.status === 'Rejected' ? 'bg-red-50 text-red-500'    : ''}
                  `}>
                    {app.status}
                  </span>
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
              {interviewData.map((item, index) => (
                <li key={index} className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${item.color}`}>
                      {item.initials}
                    </div>
                    <div>
                      <p className='text-sm font-semibold text-gray-800'>{item.name}</p>
                      <p className='text-xs text-gray-400'>{item.role}</p>
                    </div>
                  </div>
                  <span className='text-xs font-semibold text-gray-500'>{item.time}</span>
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
          {vacanciesData.map((vacancy, index) => (
            <Card key={index} className='p-4'>
              <CardContent className='p-0'>
                <p className='font-semibold text-gray-900 mb-1'>{vacancy.title}</p>
                <p className='text-xs text-gray-400 mb-3'>{vacancy.department}</p>
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

    </div>
  )
}

export default Recruitment