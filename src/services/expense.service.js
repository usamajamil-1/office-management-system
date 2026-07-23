import api from './api'

export const getExpenses = async () => {
  const { data } = await api.get('/expense')
  return data.expense
}

export const createExpense = async (expenseData) => {
  const { data } = await api.post('/expense', expenseData)
  return data
}

export const updateExpense = async (id, expenseData) => {
  const { data } = await api.put(`/expense/${id}`, expenseData)
  return data
}

export const deleteExpense = async (id) => {
  const { data } = await api.delete(`/expense/${id}`)
  return data
}