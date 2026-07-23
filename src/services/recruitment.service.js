import api from './api'

// Applications
export const getApplications = async () => {
  const { data } = await api.get('/recruitment/applications')
  return data.applications
}

export const createApplication = async (appData) => {
  const { data } = await api.post('/recruitment/applications', appData)
  return data
}

export const updateApplication = async (id, appData) => {
  const { data } = await api.put(`/recruitment/applications/${id}`, appData)
  return data
}

export const deleteApplication = async (id) => {
  const { data } = await api.delete(`/recruitment/applications/${id}`)
  return data
}

// Interviews
export const getInterviews = async () => {
  const { data } = await api.get('/recruitment/interviews')
  return data.interviews
}

export const createInterview = async (interviewData) => {
  const { data } = await api.post('/recruitment/interviews', interviewData)
  return data
}

export const deleteInterview = async (id) => {
  const { data } = await api.delete(`/recruitment/interviews/${id}`)
  return data
}

// Vacancies
export const getVacancies = async () => {
  const { data } = await api.get('/recruitment/vacancies')
  return data.vacancies
}

export const createVacancy = async (vacancyData) => {
  const { data } = await api.post('/recruitment/vacancies', vacancyData)
  return data
}

export const updateVacancy = async (id, vacancyData) => {
  const { data } = await api.put(`/recruitment/vacancies/${id}`, vacancyData)
  return data
}

export const deleteVacancy = async (id) => {
  const { data } = await api.delete(`/recruitment/vacancies/${id}`)
  return data
}