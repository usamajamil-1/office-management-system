import React, { useState } from 'react'
import { Table, TableHead, TableRow, TableBody, TableCell, TableHeader } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Navigate, useNavigate } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'


const Employees = () => {

  const navigate = useNavigate()

  const [employees, Setemployees] = useState(() => {
    return JSON.parse(localStorage.getItem('employees') || '[]')
  })


  const deleteEmployee = (id) => {
    const confirm = window.confirm("Confirm")
    if (confirm) {
      const updated = (employees.filter((_, id) => id !== id))
      Setemployees(updated)
      localStorage.setItem('employees', JSON.stringify(updated))
    }


  }
  const [editEmployee, setEditEmployee] = useState(null)


  const handleEdit = (employee) => {
    setEditEmployee({ ...employee })
  }

 


  const saveEdit = () => {
    const updated = employees.map((emp) =>
      emp.id === editEmployee.id ? editEmployee : emp
    )
    Setemployees(updated)
    setEditEmployee(null)
  }

  return (
    <div>

      <div className='flex justify-between items-center mb-5 p-2'>
        <h1>Employees</h1>

        <Button onClick={() => navigate('/addEmployee')}>+</Button>


        <Dialog open={editEmployee !== null} onOpenChange={() => setEditEmployee(null)}>
          <DialogContent aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Edit Employee</DialogTitle>
            </DialogHeader>
            <Input placeholder="Name" value={editEmployee?.name || ""} onChange={(e) => setEditEmployee({ ...editEmployee, name: e.target.value })} />
            <Input placeholder="Email" value={editEmployee?.email || ""} onChange={(e) => setEditEmployee({ ...editEmployee, email: e.target.value })} />
            <Input placeholder="Department" value={editEmployee?.department || ""} onChange={(e) => setEditEmployee({ ...editEmployee, department: e.target.value })} />
            <Input placeholder="role" value={editEmployee?.role || ""} onChange={(e) => setEditEmployee({ ...editEmployee, role: e.target.value })} />
            <Input placeholder="Phone Number" value={editEmployee?.phone || ""} onChange={(e) => setEditEmployee({ ...editEmployee, phone: e.target.value })} />
            <Input type="number" placeholder="Salary" value={editEmployee?.salary || ""} onChange={(e) => setEditEmployee({ ...editEmployee, salary: e.target.value })} />
            <Input type="date" placeholder="Joining Date" value={editEmployee?.joiningDate || ""} onChange={(e) => setEditEmployee({ ...editEmployee, joiningDate: e.target.value })} />
            <Input placeholder="Address" value={editEmployee?.address || ""} onChange={(e) => setEditEmployee({ ...editEmployee, address: e.target.value })} />
            <Input placeholder="CNIC (99999-9999999-9)" value={editEmployee?.cnic || ""} onChange={(e) => setEditEmployee({ ...editEmployee, cnic: e.target.value })} />
            
            <Button onClick={saveEdit} >Save</Button>
          </DialogContent>
        </Dialog>

      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {employees.map((employee, index) => (
          <Card key={index} className='p-4'>
            <CardContent className='p-0'>

              {/* Avatar + Actions */}
              <div className='flex items-start justify-between mb-3'>
                <div className='w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg font-bold'>
                  {employee.name?.charAt(0).toUpperCase()}
                </div>
                <div className='flex gap-1'>
                  <Button size='sm' variant='ghost' onClick={() => handleEdit(employee)}>
                    <Pencil size={14} />
                  </Button>
                  <Button size='sm' variant='ghost' onClick={() => deleteEmployee(employee.id)}>
                    <Trash2 size={14} className='text-red-500' />
                  </Button>
                </div>
              </div>

              {/* Info */}
              <p className='font-semibold text-gray-900'>{employee.name}</p>
              <p className='text-sm text-gray-400 mb-2'>{employee.department}</p>

              {/* Role Badge */}
              <span className='text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600'>
                {employee.role}
              </span>

              {/* Divider */}
              <div className='border-t border-gray-100 mt-3 pt-3 space-y-1'>
                <p className='text-xs text-gray-500 truncate'>{employee.email}</p>
                <p className='text-xs text-gray-500 truncate'>{employee.phone}</p>
                <p className='text-xs text-gray-500 truncate'>CNIC: {employee.cnic}</p>
                <p className='text-xs text-gray-500 truncate'>Joined: {employee.joiningDate}</p>
                <p className='text-xs text-gray-500 truncate'>Salary: {employee.salary}</p>
                <p className='text-xs text-gray-500 truncate'>{employee.address}</p>
              </div>

            </CardContent>
          </Card>

        ))}



      </div>

    </div>
  )
}

export default Employees
