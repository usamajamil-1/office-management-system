import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const AccountSettings = () => {

    const token = localStorage.getItem('token')

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        address: '',
    })

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
    })

    const fetchProfile = async () => {
        try {
            const response = await fetch('https://office-management-system-backend-m7u3.onrender.com/api/profile', {
                method: 'GET',
                headers: { 'authorization': token }
            })
            const result = await response.json()
            setForm({
                name: result.employee.name || '',
                email: result.employee.email || '',
                phone: result.employee.phone || '',
                department: result.employee.department || '',
                address: result.employee.address || '',
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProfile()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handlePasswordChange = (e) => {
        setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value })
    }

    const handleSave = async () => {
        try {
            const response = await fetch('https://office-management-system-backend-m7u3.onrender.com/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify(form)
            })

            const result = await response.json()

            if (!response.ok) {
                alert(result.message)
                return
            }

            alert('Settings saved!')
        } catch (error) {
            console.log(error)
            alert('Server se connection nahi!')
        }
    }

    const handlePasswordSave = async () => {
        if (!passwordForm.currentPassword || !passwordForm.newPassword) {
            alert('Dono password fields fill karo')
            return
        }

        try {
            const response = await fetch('https://office-management-system-backend-m7u3.onrender.com/api/profile/change-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify(passwordForm)
            })

            const result = await response.json()

            if (!response.ok) {
                alert(result.message)
                return
            }

            alert('Password changed!')
            setPasswordForm({ currentPassword: '', newPassword: '' })
        } catch (error) {
            console.log(error)
            alert('Server se connection nahi!')
        }
    }

    return (
        <div className='max-w-2xl mx-auto space-y-4'>

            {/* Profile Info */}
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
                        <p className='text-xs text-gray-400 mb-1'>Department</p>
                        <Input name='department' value={form.department} onChange={handleChange} placeholder='Department' />
                    </div>

                    <div>
                        <p className='text-xs text-gray-400 mb-1'>Address</p>
                        <Input name='address' value={form.address} onChange={handleChange} placeholder='Address' />
                    </div>

                    <Button onClick={handleSave} className='w-full'>Save Changes</Button>
                </CardContent>
            </Card>

            {/* Password Change */}
            <Card className='p-6'>
                <CardContent className='p-0 space-y-4'>
                    <h2 className='text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4'>Change Password</h2>

                    <div>
                        <p className='text-xs text-gray-400 mb-1'>Current Password</p>
                        <Input name='currentPassword' type='password' value={passwordForm.currentPassword} onChange={handlePasswordChange} placeholder='Current Password' />
                    </div>

                    <div>
                        <p className='text-xs text-gray-400 mb-1'>New Password</p>
                        <Input name='newPassword' type='password' value={passwordForm.newPassword} onChange={handlePasswordChange} placeholder='New Password' />
                    </div>

                    <Button onClick={handlePasswordSave} className='w-full'>Update Password</Button>
                </CardContent>
            </Card>

        </div>
    )
}

export default AccountSettings