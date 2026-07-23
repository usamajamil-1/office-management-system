import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { createApplication } from '@/services/recruitment.service'
import { getErrorMessage } from '@/services/api'

const AddApplication = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()


  const onSubmit = async (data) => {
    try {
      await createApplication(data)
      navigate('/recruitment')
    } catch (error) {
      alert(getErrorMessage(error))
      console.log(error)
    }
  }
  return (
    <div>
      <h1 className='mb-2 font-bold'>Add Job Application</h1>
      <div className='flex flex-col gap-4 max-w-md'>

        <Input {...register("name", { required: "Please add candidate name" })} placeholder='Candidate Name' />
        {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}

        <Input {...register("role", { required: "Please add role applied for" })} placeholder='Role Applied For' />
        {errors.role && <p className='text-red-500 text-sm'>{errors.role.message}</p>}

        <select {...register("status", { required: "Please select status" })} className='border rounded-xl p-2 text-gray-900 text-sm font-light w-full'>
          <option value=''>Status</option>
          <option value='Pending'>Pending</option>
          <option value='Approved'>Approved</option>
          <option value='Rejected'>Rejected</option>
        </select>
        {errors.status && <p className='text-red-500 text-sm'>{errors.status.message}</p>}

        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      </div>
    </div>
  )
}

export default AddApplication