'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Dashboard Error</h2>
        <p className="text-gray-600 mb-6">
          An error occurred while loading the dashboard.
        </p>
        <Button onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  )
}