import React from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import socket from '../../socket';

const Login = () => {

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      // Save login data
      localStorage.setItem('token', result.token);
      localStorage.setItem('role', result.user.role);
      localStorage.setItem('userEmail', result.user.email);
      localStorage.setItem('employeeId', result.user._id);

      // Connect socket
      socket.connect();

      // Join employee room
      socket.emit("joinRoom", result.user._id);

      // Go to dashboard
      navigate('/dashboard');

    } catch (error) {
      console.error(error);
      alert('Server se connection nahi ho raha!');
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50'>
      <Card className="w-full md:w-96">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Office Management
          </CardTitle>
          <p className='text-sm text-gray-500 text-center'>
            Welcome back!
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <Input
            {...register("email")}
            type="email"
            placeholder="Email"
          />

          <Input
            {...register("password")}
            type="password"
            placeholder="Password"
          />

          <Button onClick={handleSubmit(onSubmit)}>
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;