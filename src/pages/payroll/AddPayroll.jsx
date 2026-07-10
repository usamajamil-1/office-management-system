import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const AddPayroll = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  // Live preview ke liye basicSalary aur deduction watch karo
  const basicSalary = watch('basicSalary')
  const deduction = watch('deduction')
  const netSalary = (Number(basicSalary) || 0) - (Number(deduction) || 0)

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://office-management-system-backend-m7u3.onrender.com/api/payroll', {
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

      navigate('/payroll')

    } catch (error) {
      console.log(error)
      alert('Server se connection nahi!')
    }
  }

  return (
    <div>
      <h1 className='mb-2 font-bold'>Add Payroll</h1>
      <div className='flex flex-col gap-4 max-w-md'>

        <Input
          {...register("name", { required: "Please add employee name" })}
          placeholder='Employee Name'
        />
        {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}

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

        {/* Live preview — sirf dikhane ke liye, actual netSalary backend calculate karega */}
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