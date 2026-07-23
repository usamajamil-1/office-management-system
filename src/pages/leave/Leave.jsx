import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableRow, TableHead, TableCell, TableHeader } from '@/components/ui/table'
import { Trash2, Pencil, X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getLeaves, updateLeave, deleteLeave as deleteLeaveApi } from '@/services/leave.service'

const Leave = () => {

  const [leave, setLeave] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})

  const fetchLeaves = async () => {
    try {
      const data = await getLeaves()
      setLeave(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchLeaves()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteLeaveApi(id)
      fetchLeaves()
    } catch (error) {
      console.log(error)
    }
  }

  const startEdit = (l) => {
    setEditingId(l._id)
    setEditData({ ...l })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditData({})
  }

  const saveEdit = async () => {
    try {
      await updateLeave(editingId, editData)
      setEditingId(null)
      setEditData({})
      fetchLeaves()
    } catch (error) {
      console.log(error)
    }
  }

  const getStatusStyle = (status) => {
    if (status === 'approved') return "bg-green-100 text-green-700"
    if (status === 'rejected') return "bg-red-100 text-red-700"
    return "bg-yellow-100 text-yellow-700"
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
            <TableRow key={l._id}>
              {editingId === l._id ? (
                <>
                  <TableCell>{l.employee?.name || '—'}</TableCell>
                  <TableCell>
                    <Select value={editData.leaveType} onValueChange={(val) => setEditData({ ...editData, leaveType: val })}>
                      <SelectTrigger className='h-8 w-28'><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value='Sick Leave'>Sick Leave</SelectItem>
                        <SelectItem value='Casual Leave'>Casual Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input type='date' value={editData.fromDate?.split('T')[0]} onChange={(e) => setEditData({ ...editData, fromDate: e.target.value })} className='h-8 w-36' />
                  </TableCell>
                  <TableCell>
                    <Input type='date' value={editData.toDate?.split('T')[0]} onChange={(e) => setEditData({ ...editData, toDate: e.target.value })} className='h-8 w-36' />
                  </TableCell>
                  <TableCell>
                    <Select value={editData.status} onValueChange={(val) => setEditData({ ...editData, status: val })}>
                      <SelectTrigger className='h-8 w-28'><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value='pending'>Pending</SelectItem>
                        <SelectItem value='approved'>Approved</SelectItem>
                        <SelectItem value='rejected'>Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className='flex gap-1 items-center'>
                    <Button variant='ghost' onClick={saveEdit}><Check size={14} className='text-green-600' /></Button>
                    <Button variant='ghost' onClick={cancelEdit}><X size={14} className='text-gray-500' /></Button>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>{l.employee?.name || '—'}</TableCell>
                  <TableCell>{l.leaveType}</TableCell>
                  <TableCell>{l.fromDate?.split('T')[0]}</TableCell>
                  <TableCell>{l.toDate?.split('T')[0]}</TableCell>
                  <TableCell>
                    <span className={`${getStatusStyle(l.status)} rounded-full text-sm px-2 py-1`}>
                      {l.status}
                    </span>
                  </TableCell>
                  <TableCell className='flex gap-1 items-center'>
                    <Button variant='ghost' onClick={() => startEdit(l)}><Pencil size={14} className='text-blue-500' /></Button>
                    <Button variant='ghost' onClick={() => handleDelete(l._id)}><Trash2 size={14} className='text-red-500' /></Button>
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