import { useState, useEffect, useCallback } from 'react'
import type { Product } from '../../entities'
import { getProducts, getProduct } from '../services/products'

interface UseProductsResult {
  products: Product[]
  loading: boolean
  error: string | null
  refetch: () => void
}

interface UseProductResult {
  product: Product | null
  loading: boolean
  error: string | null
}

export function useProducts(filters?: { universe?: string; status?: string; search?: string }): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  const refetch = useCallback(() => setTick(t => t + 1), [])

  useEffect(() => {
    setLoading(true)
    setError(null)
    getProducts(filters)
      .then(setProducts)
      .catch(err => setError(err?.message ?? 'Failed to load products'))
      .finally(() => setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters?.universe, filters?.status, filters?.search, tick])

  return { products, loading, error, refetch }
}

export function useProduct(id: string): UseProductResult {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    getProduct(id)
      .then(setProduct)
      .catch(err => setError(err?.message ?? 'Failed to load product'))
      .finally(() => setLoading(false))
  }, [id])

  return { product, loading, error }
}
