import { useCallback, useEffect, useState } from 'react'
import type { Category } from '../../entities'
import { getCategories } from '../services/categories'

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  const refetch = useCallback(() => setTick(value => value + 1), [])

  useEffect(() => {
    setLoading(true)
    setError(null)
    getCategories()
      .then(setCategories)
      .catch(errorValue => setError(errorValue instanceof Error ? errorValue.message : 'Failed to load categories'))
      .finally(() => setLoading(false))
  }, [tick])

  return { categories, loading, error, refetch }
}