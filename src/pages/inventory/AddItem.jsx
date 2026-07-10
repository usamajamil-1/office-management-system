import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const AddItem = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const onSubmit = async (data) => {
        try {
            const response = await fetch('https://office-management-system-backend-m7u3.onrender.com/api/inventory', {
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

            navigate('/inventory')

        } catch (error) {
            console.log(error)
            alert('Server se connection nahi!')
        }
    }

    return (
        <div>
            <h1 className='mb-2 font-bold '>Add Item</h1>
            <div className='flex flex-col gap-4 max-w-md'>
                <Input {...register("itemName", { required: "Please add item name" })} placeholder='Item Name' />
                {errors.itemName && <p className='text-red-500 text-sm'>{errors.itemName.message}</p>}

                <select {...register("Category", { required: "Please fill the field" })} className='border rounded-xl p-2 text-gray-900 text-sm font-light w-full'>
                    <option value={""}>Category</option>
                    <option value={'electronics'}>Electronics</option>
                    <option value={'furniture'}>Furniture</option>
                    <option value={'Stationery'}>Stationery</option>
                    <option value={'vehical'}>Vehical</option>
                </select>
                {errors.Category && <p className='text-red-500 text-sm'>{errors.Category.message}</p>}

                <Input type='number' {...register("quantity", { required: "Please fill the field" })} placeholder='Quantity' />
                {errors.quantity && <p className='text-red-500 text-sm'>{errors.quantity.message}</p>}

                <select {...register("status", { required: "Please fill the field" })} className='border rounded-xl p-2 text-gray-900 text-sm font-light w-full'>
                    <option value={""}>Status</option>
                    <option value={'available'}>Available</option>
                    <option value={'out of stock'}>Out of stock</option>
                </select>
                {errors.status && <p className='text-red-500 text-sm'>{errors.status.message}</p>}

                <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
            </div>
        </div>
    )
}

export default AddItem