import React, { useState, useEffect } from 'react'
import StatCard from '@/components/common/StatCard'
import { getSummary } from '@/services/reports.service'

const Reports = () => {

  const [summary, setSummary] = useState({
    totalEmployees: 0,
    totalTasks: 0,
    totalExpenses: 0,
    totalLeaves: 0,
    totalInventory: 0,
  })
  

  const fetchSummary = async () => {
  try {
    const data = await getSummary()
    setSummary(data)
  } catch (error) {
    console.log(error)
  }
}

  useEffect(() => {
    fetchSummary()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-center'>
        <StatCard title={"Total Employee"} value={summary.totalEmployees} />
        <StatCard title={"Total Tasks"} value={summary.totalTasks} />
        <StatCard title={"Total Expenses"} value={summary.totalExpenses} />
        <StatCard title={"Total Leaves"} value={summary.totalLeaves} />
        <StatCard title={"Inventory"} value={summary.totalInventory} />
      </div>
    </div>
  )
}

export default Reports