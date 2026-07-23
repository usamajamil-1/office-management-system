// TEMPORARY DUMMY DATA — backend mein in cheezon ka data abhi nahi hai
// (attendance-by-month, department breakdown, pay breakdown, performance scores)
// Jab in ka backend endpoint ban jaye, is file ko hata kar real API se replace karna hai

export const attendanceData = [
  { month: 'Jan', present: 22, absent: 3 },
  { month: 'Feb', present: 20, absent: 4 },
  { month: 'Mar', present: 23, absent: 2 },
  { month: 'Apr', present: 21, absent: 5 },
  { month: 'May', present: 24, absent: 1 },
  { month: 'Jun', present: 22, absent: 3 },
]

export const employeeStructureData = [
  { name: 'IT', value: 12, color: '#316AFF' },
  { name: 'HR', value: 6, color: '#FFA500' },
  { name: 'Sales', value: 9, color: '#22C55E' },
  { name: 'Finance', value: 5, color: '#EF4444' },
]

export const companyPayData = [
  { name: 'Salaries', value: 65, color: '#316AFF' },
  { name: 'Bonuses', value: 15, color: '#22C55E' },
  { name: 'Benefits', value: 12, color: '#FFA500' },
  { name: 'Other', value: 8, color: '#EF4444' },
]

export const performanceData = [
  { name: 'Ali Khan', role: 'Developer', score: 88, initials: 'AK', color: 'bg-blue-100 text-blue-600' },
  { name: 'Sara Ahmed', role: 'Designer', score: 92, initials: 'SA', color: 'bg-purple-100 text-purple-600' },
  { name: 'Bilal Hassan', role: 'HR Executive', score: 76, initials: 'BH', color: 'bg-green-100 text-green-600' },
]