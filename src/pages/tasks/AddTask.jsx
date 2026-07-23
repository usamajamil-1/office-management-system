import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { createTask } from '@/services/task.service'
import { getEmployees } from '@/services/employee.service'
import { getErrorMessage } from '@/services/api'

const AddTask = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()

  const [employees, setEmployees] = useState([])

  useEffect(() => {
    getEmployees().then(setEmployees).catch(console.log)
  }, [])

  const navigate = useNavigate()



  const onSubmit = async (data) => {
    try {
      await createTask(data)
      navigate('/tasks')
    } catch (error) {
      alert(getErrorMessage(error))
      console.log(error)
    }
  }

  return (
    <div>
      <h1 className='mb-2 font-bold '>Add Tasks</h1>
      <div className='flex flex-col gap-4 max-w-md'>
        <Input {...register("title", { required: "Please add title" })} placeholder='Title' />
        {errors.title && <p className='text-red-500 text-sm'>{errors.title.message}</p>}

        <select {...register("assignedTo", { required: "Please select an employee" })} className='border rounded-xl p-2 text-gray-900 text-sm font-light w-full'>
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp._id} value={emp._id}>{emp.name}</option>
          ))}
        </select>
        {errors.assignedTo && <p className='text-red-500 text-sm'>{errors.assignedTo.message}</p>}

        <Input {...register("dueDate", { required: "Please fill the field" })} type={'date'} placeholder='Due Date' />
        {errors.dueDate && <p className='text-red-500 text-sm'>{errors.dueDate.message}</p>}

        <select {...register("status", { required: "Please fill the field" })} className='border rounded-xl p-2 text-gray-900 text-sm font-light w-full'>
          <option value={""}>Status</option>
          <option value={'pending'}>Pending</option>
          <option value={'inProgress'}>In Progress</option>
          <option value={'completed'}>Completed</option>
        </select>
        {errors.status && <p className='text-red-500 text-sm'>{errors.status.message}</p>}

        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      </div>
    </div>
  )
}

export default AddTask