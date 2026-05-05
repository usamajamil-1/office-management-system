import React from 'react'
import { useState } from 'react'
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from '@/components/ui/table'


const PayrollDetail = () => {

    const [payrollDetail, setPayrollDetail] = useState([
        { name: "Usama", department: "IT", basicSalary: "120K", deduction: "20k", netSalary: "100k" },
        { name: "Hassan", department: "HR", basicSalary: "80K", deduction: "10k", netSalary: "70k" },
        { name: "Ali", department: "Marketing", basicSalary: "70K", deduction: "10k", netSalary: "60k" },
        { name: "Umer", department: "sale", basicSalary: "55K", deduction: "5k", netSalary: "50k" }
    ])

    return (
        <div className='overflow-x-auto'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>department</TableHead>
                        <TableHead>basicSalary</TableHead>
                        <TableHead>deduction</TableHead>
                        <TableHead>netSalary</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {payrollDetail.map((payrollDetail) => (
                        <TableRow key={payrollDetail.name}>
                            <TableCell>{payrollDetail.name}</TableCell>
                            <TableCell>{payrollDetail.department}</TableCell>
                            <TableCell>{payrollDetail.basicSalary}</TableCell>
                            <TableCell>{payrollDetail.deduction}</TableCell>
                            <TableCell>{payrollDetail.netSalary}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default PayrollDetail