'use client'

import { useState, useEffect } from 'react'
import { VenueCard } from '@/components/venue-card'
import { VenueDetails } from '@/components/venue-details'
import { useParams } from 'next/navigation'

interface Venue {
  id: string
  roomName: string
  description: string
  photo: string | null
}

export default function BookVenue() {
  const { id } = useParams()
  const [venues, setVenues] = useState<Venue[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null)
  const venueId = Array.isArray(id) ? id[0] : id

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await fetch('/api/get_records')
        if (!res.ok) throw new Error('Failed to fetch venues')
        const response = await res.json()
        const data = response.data
        const filteredVenues = data
          .filter((item: Record<string, any>) => venueId && item.hasOwnProperty(venueId))
          .flatMap((item: Record<string, any>) => {
            if (!venueId) return []
            const venue = item[venueId]
            return venue?.rooms ? Object.values(venue.rooms) : []
          })
        setVenues(filteredVenues)
      } catch (error) {
        console.error('Error fetching venues:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVenues()
  }, [venueId])

  if (loading) return <div>Loading...</div>

  if (selectedVenue) {
    return <VenueDetails {...selectedVenue} />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Venues</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <VenueCard
            key={venue.id}
            id={Number(venue.id)}
            roomName={venue.roomName}
            onClick={() => setSelectedVenue(venue)}
            onButtonClick={() => setSelectedVenue(venue)}
          />
        ))}
      </div>
    </div>
  )
}


