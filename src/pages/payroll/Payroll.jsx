import React from 'react'
import { useState } from 'react'
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from '@/components/ui/table'


const Payroll = () => {

  const [payroll, setPayroll] = useState([
    { name: "Usama", department: "IT", salary: "100K", Status: "Paid" },
    { name: "Hassan", department: "HR", salary: "70K", Status: "UnPaid" },
    { name: "Ali", department: "Marketing", salary: "60K", Status: "Paid" },
    { name: "Umer", department: "sale", salary: "50K", Status: "UnPaid" }
  ])


  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>department</TableHead>
            <TableHead>salary</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payroll.map((payroll) => (
            <TableRow key={payroll.name}>
              <TableCell>{payroll.name}</TableCell>
              <TableCell>{payroll.department}</TableCell>
              <TableCell>{payroll.salary}</TableCell>
              <TableCell>
                <span className={payroll.Status === 'Paid' ? "bg-green-100 text-green-700 rounded-full text-sm px-2 py-1" : 'bg-red-100 text-red-700 rounded-full text-sm px-2 py-1'}>
                  {payroll.Status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Payroll