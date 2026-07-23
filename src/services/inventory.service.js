import api from './api'

export const getInventory = async () => {
  const { data } = await api.get('/inventory')
  return data.item
}

export const createItem = async (itemData) => {
  const { data } = await api.post('/inventory', itemData)
  return data
}

export const updateItem = async (id, itemData) => {
  const { data } = await api.put(`/inventory/${id}`, itemData)
  return data
}

export const deleteItem = async (id) => {
  const { data } = await api.delete(`/inventory/${id}`)
  return data
}