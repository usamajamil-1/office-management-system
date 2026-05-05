import React from 'react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const AddExpense = () => {

  const { register, handleSubmit, formState: errors } = useForm()

  const navigate = useNavigate()

  const onSubmit = (data) => {

    const existing = JSON.parse(localStorage.getItem('expenses') || '[]')
    const newTask = { ...data }
    localStorage.setItem('expenses', JSON.stringify([...existing, newTask]))

    navigate('/expenses')
  }
  return (
    <div>
      <h1 className='mb-2 font-bold '>Add Tasks</h1>
      <div className='flex flex-col gap-4 max-w-md'>
        <select {...register("category", { required: "please select category" })} className='border rounded-xl p-2 text-gray-900 text-sm font-light w-full'>
          <option value={""} >Category</option>
          <option value={'utilities'} >Utilities</option>
          <option value={'salaries'} >Salaries</option>
          <option value={'rent'} >Rent</option>
        </select>
        {errors.catergory && <p className='text-sm text-red-500'>{errors.category.message}</p>}

        <Input {...register("amount", { required: "please fill the field" })} placeholder='Amount' />
        {errors.amount && <p className='text-sm text-red-500'>{errors.amount.message}</p>}

        <Input {...register("date", { required: "please fill the field" })} type={'date'} placeholder='Date' />
        {errors.date && <p className='text-sm text-red-500'>{errors.date.message}</p>}

        <select {...register("status", { required: "please fill the field" })} className='border rounded-xl p-2 text-gray-900 text-sm font-light w-full'>
          <option value={""} >Status</option>
          <option value={'paid'} >Paid</option>
          <option value={'unPaid'} >UnPaid</option>
        </select>
        {errors.status && <p className='text-sm text-red-500'>{errors.status.message}</p>}

        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      </div>
    </div>
  )
}

export default AddExpense