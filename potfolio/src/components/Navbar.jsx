import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
      navigate('/')
    }
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="bg-amber-700 text-white text-center py-1.5 text-xs sm:text-sm">
        Free shipping on orders above ₹999
      </div>
      
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-neutral-800"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link to="/" className="text-2xl sm:text-3xl font-light tracking-wide text-neutral-800">
            The Life of Fragrance
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="hover:text-amber-700 transition">Home</Link>
            <Link to="/products" className="hover:text-amber-700 transition">Products</Link>
            <Link to="/about" className="hover:text-amber-700 transition">About</Link>
            <Link to="/contact" className="hover:text-amber-700 transition">Contact</Link>
            
            {/* Only show Dashboard and Logout if user is logged in */}
            {user && (
              <>
                <Link to="/dashboard" className="hover:text-amber-700 transition">Dashboard</Link>
                <button onClick={handleLogout} className="text-sm btn-secondary">
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile - Right Side (Empty for customers, Logout for admin) */}
          <div className="md:hidden">
            {user && (
              <button onClick={handleLogout} className="text-sm text-neutral-800">
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link to="/" className="block hover:text-amber-700 transition" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/products" className="block hover:text-amber-700 transition" onClick={() => setIsOpen(false)}>Products</Link>
            <Link to="/about" className="block hover:text-amber-700 transition" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/contact" className="block hover:text-amber-700 transition" onClick={() => setIsOpen(false)}>Contact</Link>
            
            {/* Only show Dashboard if logged in */}
            {user && (
              <Link to="/dashboard" className="block hover:text-amber-700 transition" onClick={() => setIsOpen(false)}>Dashboard</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
