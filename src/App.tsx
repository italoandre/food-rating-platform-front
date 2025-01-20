import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { Restaurants } from './pages/Restaurants'
import { RestaurantDetails } from './pages/RestaurantDetails'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/restaurants" 
          element={
            <ProtectedRoute>
              <Restaurants />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/restaurants/:id" 
          element={
            <ProtectedRoute>
              <RestaurantDetails />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App 