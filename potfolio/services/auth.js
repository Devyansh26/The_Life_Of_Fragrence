import { login as apiLogin } from './api'

export const login = async (username, password) => {
  const response = await apiLogin(username, password)
  const { access_token } = response.data
  
  const user = {
    username: username,
    role: 'admin',
  }
  
  localStorage.setItem('token', access_token)
  localStorage.setItem('user', JSON.stringify(user))
  
  return user
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user')
  return userStr ? JSON.parse(userStr) : null
}

export const isAuthenticated = () => {
  return !!localStorage.getItem('token')
}
