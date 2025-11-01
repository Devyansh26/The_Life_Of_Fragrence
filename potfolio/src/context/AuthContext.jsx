/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from 'react'
import {
  login as authLogin,
  logout as authLogout,
  getCurrentUser,
  isAuthenticated as checkAuth,
} from '../../services/auth'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    if (checkAuth()) {
      const currentUser = getCurrentUser()
      setUser(currentUser)
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    const userData = await authLogin(username, password)
    setUser(userData)
    return userData
    
  }

  const logout = () => {
    authLogout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
