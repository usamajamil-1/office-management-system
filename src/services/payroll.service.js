import api from './api'

export const getPayroll = async () => {
  const { data } = await api.get('/payroll')
  return data.payroll
}

export const createPayroll = async (payrollData) => {
  const { data } = await api.post('/payroll', payrollData)
  return data
}

export const updatePayroll = async (id, payrollData) => {
  const { data } = await api.put(`/payroll/${id}`, payrollData)
  return data
}

export const deletePayroll = async (id) => {
  const { data } = await api.delete(`/payroll/${id}`)
  return data
}