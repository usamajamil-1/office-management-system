import React from 'react'
import StatCard from '@/components/common/StatCard'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'


const Dashboard = () => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3  items-center '>
        <StatCard title={"Total Employee"} value={50} />
        <StatCard title={"Present Today"} value={40} />
        <StatCard title={"On leave"} value={10} />
        <StatCard title={"Pending Tasks"} value={5} />
      </div>

      <h1 className='text-lg font-semibold mt-6 '>Recent Activity</h1>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Ali </TableCell>
              <TableCell>Checked In </TableCell>
              <TableCell>9:00 AM </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ahmad </TableCell>
              <TableCell>Checked Out </TableCell>
              <TableCell>5:00 PM </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Haseeb </TableCell>
              <TableCell>Checked In </TableCell>
              <TableCell>11:00 AM </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tanveer </TableCell>
              <TableCell>Checked Out </TableCell>
              <TableCell>4:00 PM </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

    </div>
  )
}

export default Dashboard