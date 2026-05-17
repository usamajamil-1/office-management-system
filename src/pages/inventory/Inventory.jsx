import React from 'react'
import { useState } from 'react'
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from '@/components/ui/table'
import { Trash2, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'


const Inventory = () => {

  const [inventory, setInventory] = useState(() => {
    return JSON.parse(localStorage.getItem('inventory') || '[]')
  })


  const getInventoryStatus = (status) => {
    if (status === "available") return "bg-green-100 text-green-700 "
    return 'bg-red-100 text-red-700 '
  }

  const [editItem, setEditItem] = useState(null)

  const deleteItem = (id) => {
    const updated = inventory.filter(i => i.id !== id)
    setInventory(updated)
    localStorage.setItem('inventory', JSON.stringify(updated))
  }

  const saveEdit = () => {
    const updated = inventory.map(i => i.id === editItem.id ? editItem : i)
    setInventory(updated)
    localStorage.setItem('inventory', JSON.stringify(updated))
    setEditItem(null)
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
          {inventory.map((inventory, id) => (
            <TableRow key={inventory.id}>
              <TableCell>{inventory.itemName}</TableCell>
              <TableCell>{inventory.Category}</TableCell>
              <TableCell>{inventory.quantity}</TableCell>
              <TableCell>
                <span className={`${getInventoryStatus(inventory.status)} rounded-full text-sm px-2 py-1`}>
                  {inventory.status}
                </span>
              </TableCell>
              <TableCell>
                <Button size='sm' variant='ghost' onClick={() => setEditItem(inventory)}>
                  <Pencil size={14} />
                </Button>
                <Button size='sm' variant='ghost' onClick={() => deleteItem(inventory.id)}>
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