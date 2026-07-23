import api from './api'

export const getSummary = async () => {
  const { data } = await api.get('/reports/summary')
  return data.summary
}

export const getDashboardStats = async () => {
  const { data } = await api.get('/reports/dashboard')
  return data.stats
}