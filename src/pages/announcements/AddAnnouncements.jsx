import React from 'react'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const AddAnnouncements = () => {

    const {register , handleSubmit, formState:{errors}} = useForm()

    const navigate = useNavigate()

    const onSubmit=(data)=>{
        const existing = JSON.parse(localStorage.getItem('announcements') || '[]')
        const newAnnouncement = {...data, id: Date.now()}
        localStorage.setItem('announcements',JSON.stringify([...existing,newAnnouncement]))

        navigate('/announcements')

    }

  return (
    <div>
        <h1 className='mb-2 font-bold '>Add Announcement</h1>
        <div className='flex flex-col gap-4 max-w-md'>
        <Input {...register("title",{required:"please fill the fields"})} placeholder='Title' />
        {errors.title && <p className='text-red-500 text-sm'>{errors.title.message}</p>}

        <Input {...register("message",{required:"please fill the fields"})}  placeholder='Message'/>
        {errors.message && <p className='text-red-500 text-sm'>{errors.message.message}</p>}

        <Input {...register("date",{required:"please fill the fields"})} placeholder='Date' type="date"/>
        {errors.date && <p className='text-red-500 text-sm'>{errors.date.message}</p>}

        <select {...register("type",{required:"please fill the fields"})} >
            <option value={""}>Type</option>
            <option value={"info"}>Info</option>
            <option value={"warning"}>Warning</option>
            <option value={"important"}>Important</option>
        </select>
        {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}

        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
        </div>
    </div>
  )
}

export default AddAnnouncements