import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, Phone, Building2, Briefcase, Calendar, Clock } from 'lucide-react'


const Profile = () => {

  const email = localStorage.getItem('userEmail') || 'admin@gmail.com'
  const role = localStorage.getItem('role') || 'admin'
  const name = email.split('@')[0]  // email se naam nikalo

  const info = [
    { icon: Mail, label: 'Email', value: email },
    { icon: Briefcase, label: 'Role', value: role },
    { icon: Building2, label: 'Department', value: 'Engineering' },
    { icon: Phone, label: 'Phone', value: '+92 300 1234567' },
    { icon: Calendar, label: 'Date of Birth', value: '15 March 1995' },
    { icon: Clock, label: 'Date of Joining', value: '01 January 2022' },
  ]




  return (

    <div className='max-w-2xl mx-auto'>

      {/* Avatar + Name */}
      <Card className='p-6 mb-4'>
        <CardContent className='p-0 flex items-center gap-5'>
          <div className='w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold'>
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className='text-xl font-bold text-gray-900 capitalize'>{name}</h1>
            <p className='text-sm text-gray-400 capitalize'>{role}</p>
          </div>
        </CardContent>
      </Card>

      {/* Info */}
      <Card className='p-6'>
        <CardContent className='p-0 space-y-4'>
          <h2 className='text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4'>Personal Information</h2>
          {info.map((item, index) => (
            <div key={index} className='flex items-center gap-3'>
              <div className='w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center'>
                <item.icon size={15} className='text-blue-500' />
              </div>
              <div>
                <p className='text-xs text-gray-400'>{item.label}</p>
                <p className='text-sm font-semibold text-gray-700'>{item.value}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>


  )
}

export default Profile