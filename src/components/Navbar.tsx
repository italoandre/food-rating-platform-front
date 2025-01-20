import React from 'react'
import { useNavigate } from 'react-router-dom'

export function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/restaurants')}>
          Food Rating
        </h1>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Sair
        </button>
      </div>
    </nav>
  )
} 