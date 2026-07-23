import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { createPayroll } from '@/services/payroll.service'
import { getEmployees } from '@/services/employee.service'
import { getErrorMessage } from '@/services/api'

const AddPayroll = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    getEmployees().then(setEmployees).catch(console.log)
  }, [])

  const basicSalary = watch('basicSalary')
  const deduction = watch('deduction')
  const netSalary = (Number(basicSalary) || 0) - (Number(deduction) || 0)

  const onSubmit = async (data) => {
    try {
      await createPayroll(data)
      navigate('/payroll')
    } catch (error) {
      alert(getErrorMessage(error))
      console.log(error)
    }
  }

  return (
    <div>
      <h1 className='mb-2 font-bold'>Add Payroll</h1>
      <div className='flex flex-col gap-4 max-w-md'>

        <select {...register("employee", { required: "Please select employee" })} className='border rounded-xl p-2 text-gray-900 text-sm font-light w-full'>
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp._id} value={emp._id}>{emp.name}</option>
          ))}
        </select>
        {errors.employee && <p className='text-red-500 text-sm'>{errors.employee.message}</p>}

        <Input
          {...register("department", { required: "Please add department" })}
          placeholder='Department'
        />
        {errors.department && <p className='text-red-500 text-sm'>{errors.department.message}</p>}

        <Input
          type='number'
          {...register("basicSalary", {
            required: "Please add basic salary",
            min: { value: 0, message: "Salary can't be negative" }
          })}
          placeholder='Basic Salary'
        />
        {errors.basicSalary && <p className='text-red-500 text-sm'>{errors.basicSalary.message}</p>}

        <Input
          type='number'
          {...register("deduction", {
            required: "Please add deduction (0 if none)",
            min: { value: 0, message: "Deduction can't be negative" }
          })}
          placeholder='Deduction'
        />
        {errors.deduction && <p className='text-red-500 text-sm'>{errors.deduction.message}</p>}

        <div className='border rounded-xl p-2 text-sm bg-gray-50 text-gray-700'>
          Net Salary: <span className='font-semibold'>{netSalary >= 0 ? netSalary : 0}</span>
        </div>

        <select
          {...register("status", { required: "Please select status" })}
          className='border rounded-xl p-2 text-gray-900 text-sm font-light w-full'
        >
          <option value=''>Status</option>
          <option value='Paid'>Paid</option>
          <option value='UnPaid'>UnPaid</option>
        </select>
        {errors.status && <p className='text-red-500 text-sm'>{errors.status.message}</p>}

        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      </div>
    </div>
  )
}

export default AddPayroll