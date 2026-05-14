import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, Clock, Circle } from 'lucide-react'

const MyTasks = () => {

  const email = localStorage.getItem('userEmail') || ''
  const name  = email.split('@')[0]  // email se naam nikalo

  const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
  
  const myTasks = allTasks.filter(task =>
    task.assignedTo?.toLowerCase() === name.toLowerCase()
  )

  const getStatusIcon = (status) => {
    if (status === 'completed')  return <CheckCircle2 size={16} className='text-green-500' />
    if (status === 'inProgress') return <Clock size={16} className='text-yellow-500' />
    return <Circle size={16} className='text-gray-300' />
  }

  const getStatusBadge = (status) => {
    if (status === 'completed')  return 'bg-green-50 text-green-600'
    if (status === 'inProgress') return 'bg-yellow-50 text-yellow-600'
    return 'bg-red-50 text-red-500'
  }

  return (
    <div className='max-w-2xl mx-auto'>
      <h1 className='text-lg font-semibold mb-4'>My Tasks</h1>

      {myTasks.length === 0 ? (
        <Card className='p-6'>
          <CardContent className='p-0 text-center text-gray-400 text-sm'>
            No tasks assigned to you
          </CardContent>
        </Card>
      ) : (
        <div className='space-y-3'>
          {myTasks.map((task, index) => (
            <Card key={index} className='p-4'>
              <CardContent className='p-0 flex items-center justify-between'>

                <div className='flex items-center gap-3'>
                  {getStatusIcon(task.status)}
                  <div>
                    <p className='text-sm font-semibold text-gray-800'>{task.title}</p>
                    <p className='text-xs text-gray-400'>Due: {task.dueDate}</p>
                  </div>
                </div>

                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getStatusBadge(task.status)}`}>
                  {task.status}
                </span>

              </CardContent>
            </Card>
          ))}
        </div>
      )}

    </div>
  )
}

export default MyTasks