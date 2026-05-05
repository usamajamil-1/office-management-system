import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { roles } from '@/data/roles'
import { Navigate, useNavigate } from 'react-router-dom'

const AddEmployee = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const onSubmit = (data) => {
    const existing = JSON.parse(localStorage.getItem('employees') || '[]')
    const newEmployee = { ...data }
    localStorage.setItem('employees', JSON.stringify([...existing, newEmployee]))

   navigate('/employees') 
  }



  return (
    <div className='flex flex-col gap-4 max-w-md'>
      <h1 className='mb-2 font-bold '>Add Employees</h1>

      <Input {...register("name", { required: "please add name" })} placeholder="Name" />
      {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}

      <Input {...register("email", { required: "please add email" })} placeholder="Email" />
      {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}

      <Input {...register("department", { required: "please add department" })} placeholder="Department" />
      {errors.department && <p className='text-sm text-red-500'>{errors.email.department}</p>}

      <select {...register("role", { required: "please select role" })} className='border rounded-xl p-2 text-gray-900 text-sm font-light w-full'>
        <option value="">Select the Role</option>
        {roles.map((role) => (
          <option key={role} value={role}>{role}</option>

        ))}
      </select>
      <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
    </div>
  )
}

export default AddEmployee