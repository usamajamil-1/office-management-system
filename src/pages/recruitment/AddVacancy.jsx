import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const AddVacancy = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/recruitment/vacancies', {
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

      navigate('/recruitment')

    } catch (error) {
      console.log(error)
      alert('Server se connection nahi!')
    }
  }

  return (
    <div>
      <h1 className='mb-2 font-bold'>Add Vacancy</h1>
      <div className='flex flex-col gap-4 max-w-md'>

        <Input {...register("title", { required: "Please add job title" })} placeholder='Job Title' />
        {errors.title && <p className='text-red-500 text-sm'>{errors.title.message}</p>}

        <Input {...register("department", { required: "Please add department" })} placeholder='Department' />
        {errors.department && <p className='text-red-500 text-sm'>{errors.department.message}</p>}

        <select {...register("type", { required: "Please select job type" })} className='border rounded-xl p-2 text-gray-900 text-sm font-light w-full'>
          <option value=''>Job Type</option>
          <option value='Full-Time'>Full-Time</option>
          <option value='Part-Time'>Part-Time</option>
          <option value='Contract'>Contract</option>
          <option value='Internship'>Internship</option>
        </select>
        {errors.type && <p className='text-red-500 text-sm'>{errors.type.message}</p>}

        <Input type='number' {...register("openings", { required: "Please add number of openings", min: { value: 1, message: "At least 1 opening required" } })} placeholder='Openings' />
        {errors.openings && <p className='text-red-500 text-sm'>{errors.openings.message}</p>}

        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      </div>
    </div>
  )
}

export default AddVacancy