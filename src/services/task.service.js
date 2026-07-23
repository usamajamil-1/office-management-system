import api from './api'

export const getTasks = async () => {
  const response = await api.get('/task')
  return response.data.task
}

export const createTask = async (taskData) => {
  const response = await api.post('/task', taskData)
  return response.data
}

export const updateTask = async (id, taskData) => {
  const response = await api.put(`/task/${id}`, taskData)
  return response.data
}

export const deleteTask = async (id) => {
  const response = await api.delete(`/task/${id}`)
  return response.data
}