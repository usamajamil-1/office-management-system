import React from 'react'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Settings = () => {

    const [form, setForm] = useState({
        name: localStorage.getItem('userName') || '',
        email: localStorage.getItem('userEmail') || '',
        phone: localStorage.getItem('userPhone') || '',
        password: '',
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSave = () => {
        localStorage.setItem('userName', form.name)
        localStorage.setItem('userEmail', form.email)
        localStorage.setItem('userPhone', form.phone)
        alert('Settings saved!')
    }

    return (
        <div className='max-w-2xl mx-auto'>
            <Card className='p-6'>
                <CardContent className='p-0 space-y-4'>
                    <h2 className='text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4'>Account Settings</h2>

                    <div>
                        <p className='text-xs text-gray-400 mb-1'>Name</p>
                        <Input name='name' value={form.name} onChange={handleChange} placeholder='Your Name' />
                    </div>

                    <div>
                        <p className='text-xs text-gray-400 mb-1'>Email</p>
                        <Input name='email' value={form.email} onChange={handleChange} placeholder='Your Email' />
                    </div>

                    <div>
                        <p className='text-xs text-gray-400 mb-1'>Phone</p>
                        <Input name='phone' value={form.phone} onChange={handleChange} placeholder='Your Phone' />
                    </div>

                    <div>
                        <p className='text-xs text-gray-400 mb-1'>New Password</p>
                        <Input name='password' type='password' value={form.password} onChange={handleChange} placeholder='New Password' />
                    </div>

                    <Button onClick={handleSave} className='w-full'>Save Changes</Button>

                </CardContent>
            </Card>
        </div>
    )
}

export default Settings