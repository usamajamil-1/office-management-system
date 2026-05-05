import React, { useState } from 'react'
import { Table, TableHead, TableRow, TableBody, TableCell, TableHeader } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Navigate, useNavigate } from 'react-router-dom'
import { Pencil,Trash2 } from 'lucide-react'


const Employees = () => {

  const navigate = useNavigate()

  const [employees, Setemployees] = useState(() => {
    return JSON.parse(localStorage.getItem('employees') || '[]')
  })


  const deleteEmployee = (index) => {
    const confirm = window.confirm("Confirm")
    if (confirm) {
      const updated =(employees.filter((_, i) => i !== index))
      Setemployees(updated)
      localStorage.setItem('employees', JSON.stringify(updated))
    }


  }
  const [editEmployee, setEditEmployee] = useState(null)


  const handleEdit = (index, employee) => {
    setEditEmployee({
      index: index,
      name: employees[index].name,
      email: employees[index].email,
      department: employees[index].department,
      role: employees[index].role
    })
  }


  const saveEdit = () => {
    const updated = employees.map((emp, i) =>
      i === editEmployee.index ? editEmployee : emp
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
            <Button onClick={saveEdit} >Save</Button>
          </DialogContent>
        </Dialog>

      </div>

      <div className='overflow-x-auto'>
        <Table >
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead> <div className='flex gap-3 '><Trash2 size={20}/> / <Pencil size={20}/> </div>   </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={employee.name}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell><Button onClick={() => deleteEmployee(index)}><Trash2 size={12}/></Button><span className='text-xl mx-1'>/</span>
                  <Button  onClick={() => handleEdit(index, employee)}><Pencil size={12}/> </Button></TableCell>

              </TableRow>
            ))}
          </TableBody>

        </Table>
      </div>

    </div>
  )
}

export default Employees