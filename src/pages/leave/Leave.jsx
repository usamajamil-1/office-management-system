import React from 'react'
import { useState } from 'react'
import { Table, TableBody, TableRow, TableHead, TableCell, TableHeader } from '@/components/ui/table'

const Leave = () => {

  const [leave, setLeave] = useState(()=>{
    
    return JSON.parse(localStorage.getItem('leave') || '[]')
})

  const getStatusStyle = (status) => {
    if (status === 'Approved') return "bg-green-100 text-green-700"
    if (status === 'Rejected') return "bg-red-100 text-red-700"
    return "bg-yellow-100 text-yellow-700"
  }

  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>LeaveType</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leave.map((leave) => (
            <TableRow key={id}>
              <TableCell>{leave.name}</TableCell>
              <TableCell>{leave.leaveType}</TableCell>
              <TableCell>{leave.fromDate}</TableCell>
              <TableCell>{leave.toDate}</TableCell>
              <TableCell>
                <span className={`${getStatusStyle(leave.status)} rounded-full text-sm px-2 py-1`}>
                  {leave.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Leave