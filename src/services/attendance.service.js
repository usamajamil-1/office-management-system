import api from './api'

export const markAttendance = async (employeeId, status) => {
  const { data } = await api.post('/attendance', { employee: employeeId, status })
  return data
}

export const getTodayAttendance = async () => {
  const { data } = await api.get('/attendance/today')
  return data.attendance
}

export const getAllAttendance = async () => {
  const { data } = await api.get('/attendance')
  return data.attendance
}