import React from 'react'
import { useState } from 'react'
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from '@/components/ui/table'


const Tasks = () => {

  const [tasks, setTasks] = useState(()=>{
    return JSON.parse(localStorage.getItem('tasks') || '[]')
  })

  const getTaskStatus =(status)=>{
  if (status==="completed") return "bg-green-100 text-green-700 "
  if (status==="inProgress") return 'bg-yellow-100 text-yellow-700 '
  return 'bg-red-100 text-red-700 '
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.title}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.assignedTo}</TableCell>
              <TableCell>{task.dueDate}</TableCell>
              <TableCell>
                <span className={`${getTaskStatus(task.status)} rounded-full text-sm px-2 py-1`}>
                  {task.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Tasks