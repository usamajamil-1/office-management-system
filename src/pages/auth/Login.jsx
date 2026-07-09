import React from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Login = () => {

  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://office-management-system-backend-m7u3.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (!response.ok) {
        alert(result.message)
        return
      }

      // Token aur user info save karo
      localStorage.setItem('token', result.token)
      localStorage.setItem('role', result.user.role)
      localStorage.setItem('userEmail', result.user.email)

      navigate('/dashboard')

    } catch (error) {
      alert('Server se connection nahi ho raha!')
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50'>
      <Card className={"w-full md:w-96"}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Office Management
          </CardTitle>
          <p className='text-sm text-gray-500 text-center'>Welcome back!</p>
        </CardHeader>
        <CardContent className={"flex flex-col gap-4"}>
          <Input {...register("email")} type='email' placeholder='email' />
          <Input {...register("password")} type='password' placeholder='password' />
          <Button onClick={handleSubmit(onSubmit)}>Login</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login