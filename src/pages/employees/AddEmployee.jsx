import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { roles } from '@/data/roles'
import { Navigate, useNavigate } from 'react-router-dom'

const AddEmployee = () => {

const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
 

 

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token')
      
      const response = await fetch("https://office-management-system-backend-m7u3.onrender.com/api/employees", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (!response.ok) {
        alert(result.message)
        return
      }

      navigate('/employees')

    } catch (error) {
      console.log(error)
      alert('Server se connection nahi!')
    }
  }



  return (
    <div className='flex flex-col gap-4 max-w-md'>
      <h1 className='mb-2 font-bold '>Add Employees</h1>

      <Input {...register("name", { required: "please add name" })} placeholder="Name" />
      {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}

      <Input placeholder="Password" type="password"{...register("password", {required: "Please enter password" })}/>
      {errors.password && ( <p className="text-red-500">{errors.password.message}</p>)}

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

      <Input {...register("phone", { required: "please add phone number" })} placeholder="Phone Number" />
      {errors.phone && <p className='text-sm text-red-500'>{errors.phone.message}</p>}

      <Input type="number" {...register("salary", { required: "please add salary" })} placeholder="Salary" />
      {errors.salary && <p className='text-sm text-red-500'>{errors.salary.message}</p>}

      <Input
        type="date"
        {...register("joiningDate", { required: "please add joining date" })}
      />
      {errors.joiningDate && <p className='text-sm text-red-500'>{errors.joiningDate.message}</p>}

      <Input {...register("address", { required: "please add address" })} placeholder="Address" />
      {errors.address && <p className='text-sm text-red-500'>{errors.address.message}</p>}

      <Input
        {...register("cnic", {
          required: "please add CNIC",
          pattern: {
            value: /^\d{5}-\d{7}-\d{1}$/,
            message: "CNIC format should be 99999-9999999-9"
          }
        })}
        placeholder="CNIC (99999-9999999-9)"
      />
      {errors.cnic && <p className='text-sm text-red-500'>{errors.cnic.message}</p>}

     

      <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
    </div>
  )
}     

export default AddEmployee
