import { useState, useEffect, useCallback } from 'react'
import type { Story } from '../../entities'
import { getStories, getStory } from '../services/stories'

interface UseStoriesResult {
  stories: Story[]
  loading: boolean
  error: string | null
  refetch: () => void
}

interface UseStoryResult {
  story: Story | null
  loading: boolean
  error: string | null
}

export function useStories(filters?: { type?: string; status?: string }): UseStoriesResult {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  const refetch = useCallback(() => setTick(t => t + 1), [])

  useEffect(() => {
    setLoading(true)
    setError(null)
    getStories(filters)
      .then(setStories)
      .catch(err => setError(err?.message ?? 'Failed to load stories'))
      .finally(() => setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters?.type, filters?.status, tick])

  return { stories, loading, error, refetch }
}

export function useStory(id: string): UseStoryResult {
  const [story, setStory] = useState<Story | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    getStory(id)
      .then(setStory)
      .catch(err => setError(err?.message ?? 'Failed to load story'))
      .finally(() => setLoading(false))
  }, [id])

  return { story, loading, error }
}
