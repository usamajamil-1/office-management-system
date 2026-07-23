import api from './api'

export const getLeaves = async () => {
  const { data } = await api.get('/leave')
  return data.leave
}

export const applyLeave = async (leaveData) => {
  const { data } = await api.post('/leave', leaveData)
  return data
}

export const updateLeave = async (id, leaveData) => {
  const { data } = await api.put(`/leave/${id}`, leaveData)
  return data
}

export const deleteLeave = async (id) => {
  const { data } = await api.delete(`/leave/${id}`)
  return data
}