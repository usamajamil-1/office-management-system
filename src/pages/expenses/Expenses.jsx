import React from 'react'
import { useState } from 'react'
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from '@/components/ui/table'



const Expenses = () => {

    const [expenses, setExpense] = useState(()=>{
        return JSON.parse(localStorage.getItem('expenses') || '[]')
    })

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>date</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {expenses.map((expense) => (
                        <TableRow key={expense.category}>
                            <TableCell>{expense.category}</TableCell>
                            <TableCell>{expense.amount}</TableCell>
                            <TableCell>{expense.date}</TableCell>
                            <TableCell>
                                <span className={expense.status === 'Paid' ? "bg-green-100 text-green-700 rounded-full text-sm px-2 py-1" : 'bg-red-100 text-red-700 rounded-full text-sm px-2 py-1'}>
                                    {expense.status}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default Expenses