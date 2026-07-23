import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { getApplications, createInterview } from '@/services/recruitment.service'
import { getErrorMessage } from '@/services/api'

const AddInterview = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  

  const [applications, setApplications] = useState([])

  const fetchApplications = async () => {
  try {
    const data = await getApplications()
    setApplications(data || [])
  } catch (error) {
    console.log(error)
  }
}

  useEffect(() => {
    fetchApplications()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async (data) => {
  try {
    await createInterview(data)
    navigate('/recruitment')
  } catch (error) {
    alert(getErrorMessage(error))
    console.log(error)
  }
}

  return (
    <div>
      <h1 className='mb-2 font-bold'>Schedule Interview</h1>
      <div className='flex flex-col gap-4 max-w-md'>

        <select {...register("application", { required: "Please select a candidate" })} className='border rounded-xl p-2 text-gray-900 text-sm font-light w-full'>
          <option value=''>Select Candidate</option>
          {applications.map((app) => (
            <option key={app._id} value={app._id}>{app.name} — {app.role}</option>
          ))}
        </select>
        {errors.application && <p className='text-red-500 text-sm'>{errors.application.message}</p>}

        <Input type='datetime-local' {...register("time", { required: "Please select interview date & time" })} />
        {errors.time && <p className='text-red-500 text-sm'>{errors.time.message}</p>}

        <Button onClick={handleSubmit(onSubmit)}>Schedule</Button>
      </div>
    </div>
  )
}

export default AddInterview