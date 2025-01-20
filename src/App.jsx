import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Login } from './pages/Login'
import { Restaurants } from './pages/Restaurants'
import { RestaurantDetails } from './pages/RestaurantDetails'
import { ProtectedRoute } from './components/ProtectedRoute'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen w-full bg-gray-50">
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
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
