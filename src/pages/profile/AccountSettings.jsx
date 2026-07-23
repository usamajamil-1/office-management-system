import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getProfile, updateProfile, changePassword } from '@/services/profile.service'
import { getErrorMessage } from '@/services/api'

const AccountSettings = () => {



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
            const data = await getProfile()
            setForm({
                name: data.name || '',
                email: data.email || '',
                phone: data.phone || '',
                department: data.department || '',
                address: data.address || '',
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
            await updateProfile(form)
            alert('Settings saved!')
        } catch (error) {
            alert(getErrorMessage(error))
            console.log(error)
        }
    }

    const handlePasswordSave = async () => {
        if (!passwordForm.currentPassword || !passwordForm.newPassword) {
            alert('Dono password fields fill karo')
            return
        }

        try {
            await changePassword(passwordForm)
            alert('Password changed!')
            setPasswordForm({ currentPassword: '', newPassword: '' })
        } catch (error) {
            alert(getErrorMessage(error))
            console.log(error)
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