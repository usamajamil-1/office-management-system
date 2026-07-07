import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from '@/components/ui/table'
import { Trash2, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const Expenses = () => {

    const [expenses, setExpense] = useState([])
    const [editExpense, setEditExpense] = useState(null)
    const token = localStorage.getItem('token')

    const fetchExpenses = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/expense', {
                method: 'GET',
                headers: { 'authorization': token }
            })
            const result = await response.json()
            setExpense(result.expense)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchExpenses()
    }, [])

    const deleteExpense = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/expense/${id}`, {
                method: 'DELETE',
                headers: { 'authorization': token }
            })
            fetchExpenses()
        } catch (error) {
            console.log(error)
        }
    }

    const saveEdit = async () => {
        try {
            await fetch(`http://localhost:5000/api/expense/${editExpense._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify(editExpense)
            })
            setEditExpense(null)
            fetchExpenses()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {expenses.map((expense) => (
                        <TableRow key={expense._id}>
                            <TableCell>{expense.category}</TableCell>
                            <TableCell>{expense.amount}</TableCell>
                            <TableCell>{expense.date?.split('T')[0]}</TableCell>
                            <TableCell>
                                <span className={expense.status === 'paid' ? "bg-green-100 text-green-700 rounded-full text-sm px-2 py-1" : 'bg-red-100 text-red-700 rounded-full text-sm px-2 py-1'}>
                                    {expense.status}
                                </span>
                            </TableCell>
                            <TableCell>
                                <Button size='sm' variant='ghost' onClick={() => setEditExpense(expense)}>
                                    <Pencil size={14} />
                                </Button>
                                <Button size='sm' variant='ghost' onClick={() => deleteExpense(expense._id)}>
                                    <Trash2 size={14} className='text-red-500' />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={editExpense !== null} onOpenChange={() => setEditExpense(null)}>
                <DialogContent aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>Edit Expense</DialogTitle>
                    </DialogHeader>
                    <select value={editExpense?.category || ""} onChange={e => setEditExpense({ ...editExpense, category: e.target.value })} className='border rounded-xl p-2 text-sm'>
                        <option value='utilities'>Utilities</option>
                        <option value='salaries'>Salaries</option>
                        <option value='rent'>Rent</option>
                    </select>
                    <Input placeholder="Amount" value={editExpense?.amount || ""} onChange={e => setEditExpense({ ...editExpense, amount: e.target.value })} />
                    <Input type="date" value={editExpense?.date?.split('T')[0] || ""} onChange={e => setEditExpense({ ...editExpense, date: e.target.value })} />
                    <select value={editExpense?.status || ""} onChange={e => setEditExpense({ ...editExpense, status: e.target.value })} className='border rounded-xl p-2 text-sm'>
                        <option value='paid'>Paid</option>
                        <option value='unPaid'>UnPaid</option>
                    </select>
                    <Button onClick={saveEdit}>Save</Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Expenses