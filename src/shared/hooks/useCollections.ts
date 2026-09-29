import { useState, useEffect, useCallback } from 'react'
import type { Collection, Product } from '../../entities'
import { getCollections, getCollectionBySlug } from '../services/collections'

interface UseCollectionsResult {
  collections: Collection[]
  loading: boolean
  error: string | null
  refetch: () => void
}

interface UseCollectionResult {
  collection: Collection | null
  products: Product[]
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

export function useCollection(slug: string): UseCollectionResult {
  const [collection, setCollection] = useState<Collection | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setError(null)
    getCollectionBySlug(slug)
      .then(result => {
        setCollection(result.collection)
        setProducts(result.products)
      })
      .catch(err => setError(err?.message ?? 'Failed to load collection'))
      .finally(() => setLoading(false))
  }, [slug])

  return { collection, products, loading, error }
}
