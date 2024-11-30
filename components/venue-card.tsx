import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface VenueCardProps {
  id: number
  roomName: string
  onClick: () => void
  onButtonClick: () => void
}

export function VenueCard({ id, roomName, onClick, onButtonClick }: VenueCardProps) {
  return (
    <div onClick={onClick} className="border rounded-lg p-4 shadow-sm">
      <h2 className="text-xl font-semibold mb-2">{roomName}</h2>
      <Button onClick={onButtonClick}>View Details</Button>
    </div>
  )
}

