import React from 'react'
import { useState } from 'react'
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from '@/components/ui/table'
import { Trash2, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'


const Tasks = () => {

  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem('tasks') || '[]')
  })

  const getTaskStatus = (status) => {
    if (status === "completed") return "bg-green-100 text-green-700 "
    if (status === "inProgress") return 'bg-yellow-100 text-yellow-700 '
    return 'bg-red-100 text-red-700 '
  }

  const deleteTask = (id) => {
    const updated = tasks.filter(t => t.id !== id)
    setTasks(updated)
    localStorage.setItem('tasks', JSON.stringify(updated))
  }

  const [editTask, setEditTask] = useState(null)
  const saveEdit = () => {
    const updated = tasks.map(t => t.id === editTask.id ? editTask : t)
    setTasks(updated)
    localStorage.setItem('tasks', JSON.stringify(updated))
    setEditTask(null)
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
          {tasks.map((task, id) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.assignedTo}</TableCell>
              <TableCell>{task.dueDate}</TableCell>
              <TableCell>
                <span className={`${getTaskStatus(task.status)} rounded-full text-sm px-2 py-1`}>
                  {task.status}
                </span>
              </TableCell>
              <TableCell>
                <Button size='sm' variant='ghost' onClick={() => deleteTask(task.id)}>
                  <Trash2 size={14} className='text-red-500' />
                </Button>
                <Button size='sm' variant='ghost' onClick={() => setEditTask(task)}>
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
          <Input placeholder="Assigned To" value={editTask?.assignedTo || ""} onChange={e => setEditTask({ ...editTask, assignedTo: e.target.value })} />
          <Input type="date" value={editTask?.dueDate || ""} onChange={e => setEditTask({ ...editTask, dueDate: e.target.value })} />
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