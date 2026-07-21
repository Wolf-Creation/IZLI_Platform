import { useState, useEffect, useCallback } from 'react'
import type { Collection } from '../../entities'
import { getCollections, getCollection } from '../services/collections'

interface UseCollectionsResult {
  collections: Collection[]
  loading: boolean
  error: string | null
  refetch: () => void
}

interface UseCollectionResult {
  collection: Collection | null
  loading: boolean
  error: string | null
}

export function useCollections(): UseCollectionsResult {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  const refetch = useCallback(() => setTick(t => t + 1), [])

  useEffect(() => {
    setLoading(true)
    setError(null)
    getCollections()
      .then(setCollections)
      .catch(err => setError(err?.message ?? 'Failed to load collections'))
      .finally(() => setLoading(false))
  }, [tick])

  return { collections, loading, error, refetch }
}

export function useCollection(id: string): UseCollectionResult {
  const [collection, setCollection] = useState<Collection | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    getCollection(id)
      .then(setCollection)
      .catch(err => setError(err?.message ?? 'Failed to load collection'))
      .finally(() => setLoading(false))
  }, [id])

  return { collection, loading, error }
}
