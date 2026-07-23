import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from '@/components/ui/table'
import { Trash2, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { getPayroll, updatePayroll, deletePayroll as deletePayrollApi } from '@/services/payroll.service'

const Payroll = () => {

  const [payroll, setPayroll] = useState([])
  const [editPayroll, setEditPayroll] = useState(null)

  const fetchPayroll = async () => {
    try {
      const data = await getPayroll()
      setPayroll(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPayroll()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deletePayrollApi(id)
      fetchPayroll()
    } catch (error) {
      console.log(error)
    }
  }

  const saveEdit = async () => {
    try {
      await updatePayroll(editPayroll._id, editPayroll)
      setEditPayroll(null)
      fetchPayroll()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>department</TableHead>
            <TableHead>salary</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payroll.map((p) => (
            <TableRow key={p._id}>
              <TableCell>{p.employee?.name || '—'}</TableCell>
              <TableCell>{p.department}</TableCell>
              <TableCell>{p.netSalary}</TableCell>
              <TableCell>
                <span className={p.status === 'Paid' ? "bg-green-100 text-green-700 rounded-full text-sm px-2 py-1" : 'bg-red-100 text-red-700 rounded-full text-sm px-2 py-1'}>
                  {p.status}
                </span>
              </TableCell>
              <TableCell>
                <Button size='sm' variant='ghost' onClick={() => setEditPayroll(p)}>
                  <Pencil size={14} />
                </Button>
                <Button size='sm' variant='ghost' onClick={() => handleDelete(p._id)}>
                  <Trash2 size={14} className='text-red-500' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={editPayroll !== null} onOpenChange={() => setEditPayroll(null)}>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Edit Payroll</DialogTitle>
          </DialogHeader>

          <p className='text-sm text-gray-500'>Employee: <span className='font-semibold text-gray-800'>{editPayroll?.employee?.name || '—'}</span></p>

          <Input
            placeholder="Department"
            value={editPayroll?.department || ""}
            onChange={e => setEditPayroll({ ...editPayroll, department: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Basic Salary"
            value={editPayroll?.basicSalary ?? ""}
            onChange={e => setEditPayroll({ ...editPayroll, basicSalary: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Deduction"
            value={editPayroll?.deduction ?? ""}
            onChange={e => setEditPayroll({ ...editPayroll, deduction: e.target.value })}
          />
          <select
            value={editPayroll?.status || ""}
            onChange={e => setEditPayroll({ ...editPayroll, status: e.target.value })}
            className='border rounded-xl p-2 text-sm'
          >
            <option value='Paid'>Paid</option>
            <option value='UnPaid'>UnPaid</option>
          </select>

          <Button onClick={saveEdit}>Save</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Payroll