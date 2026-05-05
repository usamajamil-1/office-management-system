import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const AddTask = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()


  const navigate = useNavigate()

  const onSubmit = (data) => {

    const existing = JSON.parse(localStorage.getItem('tasks') || '[]')
    const newTask = { ...data }
    localStorage.setItem('tasks', JSON.stringify([...existing, newTask]))

    navigate('/tasks')
  }


  return (
    <div>
      <h1 className='mb-2 font-bold '>Add Tasks</h1>
      <div className='flex flex-col gap-4 max-w-md'>
        <Input {...register("title", { required: "Please add title" })} placeholder='Title' />
        {errors.title && <p className='text-red-500 text-sm'>{errors.title.message}</p>}

        <Input {...register("assignedTo", { required: "Please fill the field" })} placeholder='Assign to' />
        {errors.assignedTo && <p className='text-red-500 text-sm'>{errors.assignedTo.message}</p>}

        <Input {...register("dueDate", { required: "Please fill the field" })} type={'date'} placeholder='Due Date' />
        {errors.dueDate && <p className='text-red-500 text-sm'>{errors.dueDate.message}</p>}

        <select {...register("status", { required: "Please fill the field" })} className='border rounded-xl p-2 text-gray-900 text-sm font-light w-full'>
          <option value={""} >Status</option>
          <option value={'pending'} >Pending</option>
          <option value={'inProgress'} >In Progress</option>
          <option value={'completed'} >Completed</option>
        </select>
        {errors.status && <p className='text-red-500 text-sm'>{errors.status.message}</p>}

        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      </div>
    </div>
  )
}

export default AddTask