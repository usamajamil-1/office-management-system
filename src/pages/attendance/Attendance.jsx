import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { markAttendance, getTodayAttendance } from '@/services/attendance.service'
import { getErrorMessage } from '@/services/api'

const Attendance = () => {

  const [attendance, setAttendance] = useState([])
  const employeeId = localStorage.getItem('employeeId') || ''

  const fetchTodayAttendance = async () => {
    try {
      const data = await getTodayAttendance()
      setAttendance(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTodayAttendance()
  }, [])

  const markMyAttendance = async (status) => {
    try {
      await markAttendance(employeeId, status)
      fetchTodayAttendance()
    } catch (error) {
      alert(getErrorMessage(error))
      console.log(error)
    }
  }

  return (
    <div className='overflow-x-auto'>

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
              <TableCell>{a.employee?.name || '—'}</TableCell>
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