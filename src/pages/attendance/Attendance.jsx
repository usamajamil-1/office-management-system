import React, { useState } from 'react'
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from '@/components/ui/table'

const Attendance = () => {

  const [attendance, setAttendance] = useState([
    { name: "Ali", date: "20-4-2026", status: "Present" },
    { name: "Hassan", date: "20-4-2026", status: "Absent" },
    { name: "Haseeb", date: "20-4-2026", status: "Present" },
    { name: "Ahmad", date: "20-4-2026", status: "Absent" }
  ])

  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendance.map((attendance) => (
            <TableRow key={attendance.name}>
              <TableCell>{attendance.name}</TableCell>
              <TableCell>{attendance.date}</TableCell>
              <TableCell>
                <span className={attendance.status === 'Present' ? "bg-green-100 text-green-700 rounded-full text-sm px-2 py-1" : 'bg-red-100 text-red-700 rounded-full text-sm px-2 py-1'}>
                  {attendance.status}
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