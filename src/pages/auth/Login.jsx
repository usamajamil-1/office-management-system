import React from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { users } from '@/data/user'


const Login = () => {

  const navigate = useNavigate()

  const onSubmit = (data) => {
    const foundUser = users.find(u=> u.email===data.email && u.password===data.password )

      if (!foundUser) {
    alert("Email or password is wrong!")
    return
  }

    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem("role", foundUser.role)
    navigate('/dashboard')
  }
 
  const {register, handleSubmit, formState:{errors} } = useForm()

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
          <Input  {...register("password")} type='password' placeholder='password' />
          
          <Button onClick={handleSubmit(onSubmit)}>Login</Button>
        </CardContent>
      </Card>

    </div>


  )
}

export default Login


