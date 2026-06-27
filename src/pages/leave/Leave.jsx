import React from 'react'
import { useState } from 'react'
import { Table, TableBody, TableRow, TableHead, TableCell, TableHeader } from '@/components/ui/table'
import { Trash2, Pencil, X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const Leave = () => {

  const [leave, setLeave] = useState([
    { id: 1, name: 'Ali Hassan', leaveType: 'Sick', fromDate: '2025-06-01', toDate: '2025-06-03', status: 'Approved' },
    { id: 2, name: 'Sara Khan', leaveType: 'Casual', fromDate: '2025-06-05', toDate: '2025-06-06', status: 'Pending' },
    { id: 3, name: 'Usman Tariq', leaveType: 'Annual', fromDate: '2025-06-10', toDate: '2025-06-15', status: 'Rejected' },
  ])

  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})

  const getStatusStyle = (status) => {
    if (status === 'Approved') return "bg-green-100 text-green-700"
    if (status === 'Rejected') return "bg-red-100 text-red-700"
    return "bg-yellow-100 text-yellow-700"
  }

  const deleteLeave = (id) => {
    const update = leave.filter((l) => l.id !== id)
    setLeave(update)
  }

  const startEdit = (l) => {
    setEditingId(l.id)
    setEditData({ ...l })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditData({})
  }

  const saveEdit = () => {
    const updated = leave.map((l) => l.id === editingId ? { ...editData } : l)
    setLeave(updated)
    setEditingId(null)
    setEditData({})
  }

  return (
    <div className='overflow-x-auto p-4'>
      <h2 className='text-lg font-semibold mb-4'>Leave Records</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Leave Type</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leave.map((l) => (
            <TableRow key={l.id}>
              {editingId === l.id ? (
                <>
                  <TableCell>
                    <Input
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className='h-8 w-28'
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={editData.leaveType}
                      onValueChange={(val) => setEditData({ ...editData, leaveType: val })}
                    >
                      <SelectTrigger className='h-8 w-28'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='Sick'>Sick</SelectItem>
                        <SelectItem value='Casual'>Casual</SelectItem>
                        <SelectItem value='Annual'>Annual</SelectItem>
                        <SelectItem value='Unpaid'>Unpaid</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      type='date'
                      value={editData.fromDate}
                      onChange={(e) => setEditData({ ...editData, fromDate: e.target.value })}
                      className='h-8 w-36'
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type='date'
                      value={editData.toDate}
                      onChange={(e) => setEditData({ ...editData, toDate: e.target.value })}
                      className='h-8 w-36'
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={editData.status}
                      onValueChange={(val) => setEditData({ ...editData, status: val })}
                    >
                      <SelectTrigger className='h-8 w-28'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='Pending'>Pending</SelectItem>
                        <SelectItem value='Approved'>Approved</SelectItem>
                        <SelectItem value='Rejected'>Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className='flex gap-1 items-center'>
                    <Button variant='ghost' onClick={saveEdit}>
                      <Check size={14} className='text-green-600' />
                    </Button>
                    <Button variant='ghost' onClick={cancelEdit}>
                      <X size={14} className='text-gray-500' />
                    </Button>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>{l.name}</TableCell>
                  <TableCell>{l.leaveType}</TableCell>
                  <TableCell>{l.fromDate}</TableCell>
                  <TableCell>{l.toDate}</TableCell>
                  <TableCell>
                    <span className={`${getStatusStyle(l.status)} rounded-full text-sm px-2 py-1`}>
                      {l.status}
                    </span>
                  </TableCell>
                  <TableCell className='flex gap-1 items-center'>
                    <Button variant='ghost' onClick={() => startEdit(l)}>
                      <Pencil size={14} className='text-blue-500' />
                    </Button>
                    <Button variant='ghost' onClick={() => deleteLeave(l.id)}>
                      <Trash2 size={14} className='text-red-500' />
                    </Button>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Leave