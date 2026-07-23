import api from './api'

export const getAnnouncements = async () => {
  const { data } = await api.get('/announcement')
  return data.announcement
}

export const createAnnouncement = async (announcementData) => {
  const { data } = await api.post('/announcement', announcementData)
  return data
}

export const updateAnnouncement = async (id, announcementData) => {
  const { data } = await api.put(`/announcement/${id}`, announcementData)
  return data
}

export const deleteAnnouncement = async (id) => {
  const { data } = await api.delete(`/announcement/${id}`)
  return data
}