import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'

const Attendance = () => {

  const [attendance, setAttendance] = useState([])
  const token = localStorage.getItem('token')
  const email = localStorage.getItem('userEmail') || ''
  const name = email.split('@')[0]

  const fetchTodayAttendance = async () => {
    try {
      const response = await fetch("https://office-management-system-backend-m7u3.onrender.com/api/attendance/today", {
        method: 'GET',
        headers: { 'authorization': token }
      })
      const result = await response.json()
      setAttendance(result.attendance)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTodayAttendance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const markMyAttendance = async (status) => {
    try {
      const response = await fetch("https://office-management-system-backend-m7u3.onrender.com/api/attendance/today", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token
        },
        body: JSON.stringify({ name, status })
      })

      const result = await response.json()

      if (!response.ok) {
        alert(result.message)
        return
      }

      fetchTodayAttendance()

    } catch (error) {
      console.log(error)
      alert('Server se connection nahi!')
    }
  }

  return (
    <div className='overflow-x-auto'>

      {/* Mark attendance buttons */}
      <div className='mb-4 flex gap-2'>
        <Button onClick={() => markMyAttendance('Present')} className='bg-green-600 hover:bg-green-700'>
          Mark Present
        </Button>
        <Button onClick={() => markMyAttendance('Absent')} variant='outline' className='text-red-600 border-red-300'>
          Mark Absent
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendance.map((a) => (
            <TableRow key={a._id}>
              <TableCell>{a.name}</TableCell>
              <TableCell>{a.date?.split('T')[0]}</TableCell>
              <TableCell>
                <span className={a.status === 'Present' ? "bg-green-100 text-green-700 rounded-full text-sm px-2 py-1" : 'bg-red-100 text-red-700 rounded-full text-sm px-2 py-1'}>
                  {a.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Attendance