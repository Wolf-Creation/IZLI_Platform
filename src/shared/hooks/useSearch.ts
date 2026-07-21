import { useState, useEffect, useRef } from 'react'
import type { SearchResults } from '../services/search'
import { search } from '../services/search'

interface UseSearchResult {
  query: string
  setQuery: (q: string) => void
  results: SearchResults | null
  loading: boolean
}

const EMPTY_RESULTS: SearchResults = {
  products: [],
  stories: [],
  members: [],
  all: [],
  total: 0,
}

export function useSearch(): UseSearchResult {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResults | null>(null)
  const [loading, setLoading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    if (!query.trim()) {
      setResults(EMPTY_RESULTS)
      setLoading(false)
      return
    }

    setLoading(true)
    timerRef.current = setTimeout(() => {
      search(query)
        .then(setResults)
        .catch(() => setResults(EMPTY_RESULTS))
        .finally(() => setLoading(false))
    }, 300)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [query])

  return { query, setQuery, results, loading }
}
