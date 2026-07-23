import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from '@/components/ui/table'
import { Trash2, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { getTasks, updateTask, deleteTask as deleteTaskApi } from '@/services/task.service'
import { getEmployees } from '@/services/employee.service'


const Tasks = () => {

  const [tasks, setTasks] = useState([])
  const [editTask, setEditTask] = useState(null)
  const [employees, setEmployees] = useState([])


  const fetchTasks = async () => {
    try {
      const data = await getTasks()
      setTasks(data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees()
      setEmployees(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTasks()
    fetchEmployees()
  }, [])

  const getTaskStatus = (status) => {
    if (status === "completed") return "bg-green-100 text-green-700 "
    if (status === "inProgress") return 'bg-yellow-100 text-yellow-700 '
    return 'bg-red-100 text-red-700 '
  }

  const handleDelete = async (id) => {
    try {
      await deleteTaskApi(id)
      fetchTasks()
    } catch (error) {
      console.log(error)
    }
  }

  const saveEdit = async () => {
  try {
    await updateTask(editTask._id, editTask)
    setEditTask(null)
    fetchTasks()
  } catch (error) {
    console.log(error)
  }
}

  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task._id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.assignedTo?.name || '—'}</TableCell>
              <TableCell>{task.dueDate?.split('T')[0]}</TableCell>
              <TableCell>
                <span className={`${getTaskStatus(task.status)} rounded-full text-sm px-2 py-1`}>
                  {task.status}
                </span>
              </TableCell>
              <TableCell>
                <Button size='sm' variant='ghost' onClick={() => handleDelete(task._id)}>
                  <Trash2 size={14} className='text-red-500' />
                </Button>
                <Button size='sm' variant='ghost' onClick={() => setEditTask({ ...task, assignedTo: task.assignedTo?._id || '' })}>
                  <Pencil size={14} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={editTask !== null} onOpenChange={() => setEditTask(null)}>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <Input placeholder="Title" value={editTask?.title || ""} onChange={e => setEditTask({ ...editTask, title: e.target.value })} />
          <select
            value={editTask?.assignedTo || ""}
            onChange={e => setEditTask({ ...editTask, assignedTo: e.target.value })}
            className='border rounded-xl p-2 text-sm'
          >
            <option value="">Select Employee</option>
            {employees.map(emp => (
              <option key={emp._id} value={emp._id}>{emp.name}</option>
            ))}
          </select>
          <Input type="date" value={editTask?.dueDate?.split('T')[0] || ""} onChange={e => setEditTask({ ...editTask, dueDate: e.target.value })} />
          <select value={editTask?.status || ""} onChange={e => setEditTask({ ...editTask, status: e.target.value })} className='border rounded-xl p-2 text-sm'>
            <option value='pending'>Pending</option>
            <option value='inProgress'>In Progress</option>
            <option value='completed'>Completed</option>
          </select>
          <Button onClick={saveEdit}>Save</Button>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default Tasks