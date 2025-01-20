import React from 'react'
import { Navigate } from 'react-router-dom'
import { Navbar } from './Navbar'

interface Props {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: Props) {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  )
} 