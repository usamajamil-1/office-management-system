import api from './api'

export const getProfile = async () => {
  const { data } = await api.get('/profile')
  return data.employee
}

export const updateProfile = async (profileData) => {
  const { data } = await api.put('/profile', profileData)
  return data
}

export const changePassword = async (passwordData) => {
  const { data } = await api.put('/profile/change-password', passwordData)
  return data
}