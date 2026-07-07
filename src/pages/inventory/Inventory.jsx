import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from '@/components/ui/table'
import { Trash2, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const Inventory = () => {

  const [inventory, setInventory] = useState([])
  const [editItem, setEditItem] = useState(null)
  const token = localStorage.getItem('token')

  const fetchInventory = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/inventory', {
        method: 'GET',
        headers: { 'authorization': token }
      })
      const result = await response.json()
      setInventory(result.item)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchInventory()
  }, [])

  const getInventoryStatus = (status) => {
    if (status === "available") return "bg-green-100 text-green-700 "
    return 'bg-red-100 text-red-700 '
  }

  const deleteItem = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/inventory/${id}`, {
        method: 'DELETE',
        headers: { 'authorization': token }
      })
      fetchInventory()
    } catch (error) {
      console.log(error)
    }
  }

  const saveEdit = async () => {
    try {
      await fetch(`http://localhost:5000/api/inventory/${editItem._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token
        },
        body: JSON.stringify(editItem)
      })
      setEditItem(null)
      fetchInventory()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item Name</TableHead>
            <TableHead>Category To</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.itemName}</TableCell>
              <TableCell>{item.Category}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>
                <span className={`${getInventoryStatus(item.status)} rounded-full text-sm px-2 py-1`}>
                  {item.status}
                </span>
              </TableCell>
              <TableCell>
                <Button size='sm' variant='ghost' onClick={() => setEditItem(item)}>
                  <Pencil size={14} />
                </Button>
                <Button size='sm' variant='ghost' onClick={() => deleteItem(item._id)}>
                  <Trash2 size={14} className='text-red-500' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={editItem !== null} onOpenChange={() => setEditItem(null)}>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
          </DialogHeader>
          <Input placeholder="Item Name" value={editItem?.itemName || ""} onChange={e => setEditItem({ ...editItem, itemName: e.target.value })} />
          <select value={editItem?.Category || ""} onChange={e => setEditItem({ ...editItem, Category: e.target.value })} className='border rounded-xl p-2 text-sm'>
            <option value='electronics'>Electronics</option>
            <option value='furniture'>Furniture</option>
            <option value='Stationery'>Stationery</option>
            <option value='vehical'>Vehical</option>
          </select>
          <Input placeholder="Quantity" value={editItem?.quantity || ""} onChange={e => setEditItem({ ...editItem, quantity: e.target.value })} />
          <select value={editItem?.status || ""} onChange={e => setEditItem({ ...editItem, status: e.target.value })} className='border rounded-xl p-2 text-sm'>
            <option value='available'>Available</option>
            <option value='out of stock'>Out of stock</option>
          </select>
          <Button onClick={saveEdit}>Save</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Inventory