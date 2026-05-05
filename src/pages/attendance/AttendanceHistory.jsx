import React, { useState } from 'react'
import { Table, TableCell, TableBody, TableHeader, TableRow, TableHead } from '@/components/ui/table'

const AttendanceHistory = () => {

    const [attendanceHistory, setAttendanceHistory] = useState([
        { name: "Ali", date: "20-2-2026", status: "Present" },
        { name: "Hassan", date: "19-3-2026", status: "Absent" },
        { name: "Haseeb", date: "1-4-2026", status: "Present" },
        { name: "Ahmad", date: "2-1-2026", status: "Absent" }
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
                    {attendanceHistory.map((attendanceHistory) => (
                        <TableRow key={attendanceHistory.name}>
                            <TableCell>{attendanceHistory.name}</TableCell>
                            <TableCell>{attendanceHistory.date}</TableCell>
                            <TableCell>
                                <span className={attendanceHistory.status === 'Present' ? "bg-green-100 text-green-700 rounded-full text-sm px-2 py-1" : 'bg-red-100 text-red-700 rounded-full text-sm px-2 py-1'}>
                                    {attendanceHistory.status}
                                </span></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default AttendanceHistory