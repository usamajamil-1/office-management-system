import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { applyLeave } from '@/services/leave.service'
import { getErrorMessage } from '@/services/api'

const ApplyLeave = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const employeeId = localStorage.getItem('employeeId') || ''

    const onSubmit = async (data) => {
      try {
        await applyLeave({ ...data, employee: employeeId })
        navigate('/leave')
      } catch (error) {
        alert(getErrorMessage(error))
        console.log(error)
      }
    }

    return (
        <div>
            <h1 className='mb-2 font-bold '>Apply Leave</h1>
            <div className='flex flex-col gap-4 max-w-md'>

                <select {...register("leaveType", { required: "Please select Leave Type" })} className='border rounded-xl p-2 text-gray-900 text-sm font-light w-full'>
                    <option value="">Select Leave Type</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                </select>
                {errors.leaveType && <p className='text-red-500 text-sm'>{errors.leaveType.message}</p>}

                <Input type={"date"} {...register("fromDate", { required: "required field" })} placeholder='From Date' />
                {errors.fromDate && <p className='text-red-500 text-sm'>{errors.fromDate.message}</p>}

                <Input type={"date"} {...register("toDate", { required: "required field" })} placeholder='To Date' />
                {errors.toDate && <p className='text-red-500 text-sm'>{errors.toDate.message}</p>}

                <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
            </div>
        </div>
    )
}

export default ApplyLeave