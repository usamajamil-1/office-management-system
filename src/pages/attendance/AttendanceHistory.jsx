import React, { useState, useEffect } from 'react'
import { Table, TableCell, TableBody, TableHeader, TableRow, TableHead } from '@/components/ui/table'

const AttendanceHistory = () => {

    const [attendanceHistory, setAttendanceHistory] = useState([])
    const token = localStorage.getItem('token')

    const fetchHistory = async () => {
        try {
            const response = await fetch('https://office-management-system-backend-m7u3.onrender.com/api/attendance', {
                method: 'GET',
                headers: { 'authorization': token }
            })
            const result = await response.json()
            setAttendanceHistory(result.attendance)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchHistory()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                    {attendanceHistory.map((a) => (
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

export default AttendanceHistory