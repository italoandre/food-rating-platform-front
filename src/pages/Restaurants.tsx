import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'
import { Restaurant } from '../types'
import { useNavigate } from 'react-router-dom'

export function Restaurants() {
  const navigate = useNavigate()
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['restaurants'],
    queryFn: async () => {
      const response = await api.get('/restaurants')
      return response.data
    }
  })

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(n => (
            <div key={n} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-50 text-red-500 p-4 rounded">
          Erro ao carregar restaurantes
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Restaurants</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {data?.map((restaurant: Restaurant) => (
          <div
            key={restaurant.id}
            onClick={() => navigate(`/restaurants/${restaurant.id}`)}
            className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{restaurant.name}</h2>
            <p className="text-gray-600">{restaurant.address}</p>
            <div className="mt-4 flex items-center text-gray-500">
              <span className="text-sm">Clique para ver detalhes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 