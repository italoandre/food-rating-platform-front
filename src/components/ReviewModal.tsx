import React, { useState } from 'react'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { api } from '../services/api'

interface Props {
  isOpen: boolean
  onClose: () => void
  restaurantId: string
}

export function ReviewModal({ isOpen, onClose, restaurantId }: Props) {
  const queryClient = useQueryClient()
  const [review, setReview] = useState({
    title: '',
    description: '',
    rating: 5,
    photos: [] as File[]
  })

  const createReview = useMutation({
    mutationFn: async () => {
      const formData = new FormData()
      formData.append('title', review.title)
      formData.append('description', review.description)
      formData.append('rating', String(review.rating))
      review.photos.forEach(photo => {
        formData.append('photos[]', photo)
      })

      return api.post(`/restaurants/${restaurantId}/review`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurant', restaurantId] })
      setReview({ title: '', description: '', rating: 5, photos: [] })
      onClose()
    }
  })

  const handlePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setReview(prev => ({
        ...prev,
        photos: [...Array.from(e.target.files!)]
      }))
    }
  }

  const { data, isLoading, error } = useQuery({
    // ...
  })

  if (error) {
    return <div className="text-red-500">Error loading data</div>
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Write Review</h2>
        
        <form onSubmit={(e) => {
          e.preventDefault()
          createReview.mutate()
        }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={review.title}
              onChange={e => setReview(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <select
              value={review.rating}
              onChange={e => setReview(prev => ({ ...prev, rating: Number(e.target.value) }))}
              className="w-full p-2 border rounded"
            >
              {[1,2,3,4,5].map(num => (
                <option key={num} value={num}>{num} stars</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={review.description}
              onChange={e => setReview(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-2 border rounded"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photos (optional)
            </label>
            <input
              type="file"
              onChange={handlePhotosChange}
              multiple
              accept="image/*"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={createReview.isPending}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {createReview.isPending ? 'Sending...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 