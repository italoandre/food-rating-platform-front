import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'
import { ReviewModal } from '../components/ReviewModal'

export function RestaurantDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  const { data: restaurant, isLoading } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: async () => {
      const response = await api.get(`/restaurants/${id}`)
      return response.data
    }
  })

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-6">
            {[1, 2].map(n => (
              <div key={n} className="bg-white p-6 rounded-lg shadow">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <button 
          onClick={() => navigate('/restaurants')}
          className="mb-6 px-4 py-2 flex items-center bg-white text-gray-700 hover:bg-gray-50 rounded-lg transition-all shadow-sm"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to list
        </button>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h1 className="text-gray-900 text-4xl font-bold mb-3">{restaurant?.name}</h1>
          <p className="text-gray-600 text-lg mb-6">{restaurant?.address}</p>
          
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setIsReviewModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Write Review
            </button>
            
            <div className="text-gray-600">
              <span className="font-medium">{restaurant?.reviews?.length || 0}</span> 
              {restaurant?.reviews?.length === 1 ? ' review' : ' reviews'}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-gray-900 text-2xl font-bold mb-6">Reviews</h2>
          {restaurant?.reviews?.length ? (
            <div className="space-y-6">
              {restaurant.reviews.map(review => (
                <div key={review.id} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-900 text-xl font-semibold">{review.title}</h3>
                    <div className="flex items-center bg-gray-50 px-3 py-1 rounded-lg">
                      <div className="text-yellow-400 text-xl">{'★'.repeat(review.rating)}</div>
                      <div className="text-gray-300 text-xl">{'★'.repeat(5 - review.rating)}</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">{review.description}</p>
                  
                  {review.photos?.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      {review.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo.url}
                          alt={`Photo ${index + 1}`}
                          className="rounded-lg w-full h-48 object-cover hover:opacity-90 transition-opacity cursor-pointer"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                    <span className="font-medium">{review.user?.name}</span>
                    <span>{new Date(review.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <p className="text-gray-500 text-lg">
                No reviews yet. Be the first to review!
              </p>
            </div>
          )}
        </div>

        <ReviewModal 
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          restaurantId={id}
        />
      </div>
    </div>
  )
} 