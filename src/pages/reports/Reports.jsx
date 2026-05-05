import React from 'react'
import StatCard from '@/components/common/StatCard'


const Reports = () => {

const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
const leaves = JSON.parse(localStorage.getItem('leave') || '[]')
const expenses = JSON.parse(localStorage.getItem('expenses') || '[]')
const inventory = JSON.parse(localStorage.getItem('inventory') || '[]')

  return (
    <div><div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3  items-center '>
        <StatCard title={"Total Employee"} value={50} />
        <StatCard title={"Total Tasks"} value={tasks.length} />
        <StatCard title={"Total Expenses"} value={expenses.length} />
        <StatCard title={"Total Leaves"} value={leaves.length} />
        <StatCard title={"inventory"} value={inventory.length} />
      </div></div>
  )
}

export default Reports