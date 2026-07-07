import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, Phone, Building2, Briefcase, MapPin, Clock } from 'lucide-react'

const Profile = () => {

  const [employee, setEmployee] = useState(null)
  const token = localStorage.getItem('token')

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'GET',
        headers: { 'authorization': token }
      })
      const result = await response.json()
      setEmployee(result.employee)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!employee) {
    return <div className='text-center text-gray-400 mt-10'>Loading...</div>
  }

  const info = [
    { icon: Mail, label: 'Email', value: employee.email },
    { icon: Briefcase, label: 'Role', value: employee.role },
    { icon: Building2, label: 'Department', value: employee.department },
    { icon: Phone, label: 'Phone', value: employee.phone },
    { icon: MapPin, label: 'Address', value: employee.address },
    { icon: Clock, label: 'Date of Joining', value: employee.joiningDate?.split('T')[0] },
  ]

  return (
    <div className='max-w-2xl mx-auto'>

      {/* Avatar + Name */}
      <Card className='p-6 mb-4'>
        <CardContent className='p-0 flex items-center gap-5'>
          <div className='w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold'>
            {employee.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className='text-xl font-bold text-gray-900 capitalize'>{employee.name}</h1>
            <p className='text-sm text-gray-400 capitalize'>{employee.role}</p>
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