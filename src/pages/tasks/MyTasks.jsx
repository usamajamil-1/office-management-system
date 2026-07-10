import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, Clock, Circle } from 'lucide-react'

const MyTasks = () => {

  const [myTasks, setMyTasks] = useState([])
  const token = localStorage.getItem('token')
  const email = localStorage.getItem('userEmail') || ''
  const name = email.split('@')[0]

  const fetchMyTasks = async () => {
    try {
      const response = await fetch('https://office-management-system-backend-m7u3.onrender.com/api/task', {
        method: 'GET',
        headers: { 'authorization': token }
      })
      const result = await response.json()
      const filtered = (result.task || []).filter(task =>
        task.assignedTo?.toLowerCase() === name.toLowerCase()
      )
      setMyTasks(filtered)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMyTasks()
  }, [])

  const getStatusIcon = (status) => {
    if (status === 'completed') return <CheckCircle2 size={16} className='text-green-500' />
    if (status === 'inProgress') return <Clock size={16} className='text-yellow-500' />
    return <Circle size={16} className='text-gray-300' />
  }

  const getStatusBadge = (status) => {
    if (status === 'completed') return 'bg-green-50 text-green-600'
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
          {myTasks.map((task) => (
            <Card key={task._id} className='p-4'>
              <CardContent className='p-0 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  {getStatusIcon(task.status)}
                  <div>
                    <p className='text-sm font-semibold text-gray-800'>{task.title}</p>
                    <p className='text-xs text-gray-400'>Due: {task.dueDate?.split('T')[0]}</p>
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