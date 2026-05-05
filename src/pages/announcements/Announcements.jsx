import React from 'react'
import { useState } from 'react'
import { Table, TableBody, TableRow, TableHead, TableCell, TableHeader } from '@/components/ui/table'


const Announcements = () => {

 const [announcements, setAnnouncements] = useState(()=>{
    return JSON.parse(localStorage.getItem('announcements') || '[]')
 })

  const getStatusStyle = (type) => {
    if (type === 'info') return "bg-green-100 text-green-700"
    if (type === 'warning') return "bg-red-100 text-red-700"
    return "bg-yellow-100 text-yellow-700"
  }

  return (
    <div className='overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {announcements.map((announcements,index) => (
                <TableRow key={index}>
                  <TableCell>{announcements.title}</TableCell>
                  <TableCell>{announcements.message}</TableCell>
                  <TableCell>{announcements.date}</TableCell>
                  <TableCell>
                    <span className={`${getStatusStyle(announcements.type)} rounded-full text-sm px-2 py-1`}>
                      {announcements.type}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
  )
}

export default Announcements