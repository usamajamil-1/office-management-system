import React from 'react'
import { useState } from 'react'
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from '@/components/ui/table'


const Inventory = () => {

    const [inventory, setInventory] = useState(()=>{
        return JSON.parse(localStorage.getItem('inventory') || '[]')
    }) 


    const getInventoryStatus =(status)=>{
  if (status==="available") return "bg-green-100 text-green-700 "
  return 'bg-red-100 text-red-700 '
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((inventory,id) => (
                <TableRow key={id}>
                  <TableCell>{inventory.itemName}</TableCell>
                  <TableCell>{inventory.Category}</TableCell>
                  <TableCell>{inventory.quantity}</TableCell>
                  <TableCell>
                    <span className={`${getInventoryStatus(inventory.status)} rounded-full text-sm px-2 py-1`}>
                      {inventory.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
  )
}

export default Inventory