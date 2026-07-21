import { useState, useEffect, useCallback } from 'react'
import type { Challenge, Submission } from '../../entities'
import { getChallenges, getChallenge, getSubmissions } from '../services/challenges'

interface UseChallengesResult {
  challenges: Challenge[]
  loading: boolean
  error: string | null
  refetch: () => void
}

interface UseChallengeResult {
  challenge: Challenge | null
  loading: boolean
  error: string | null
}

interface UseSubmissionsResult {
  submissions: Submission[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useChallenges(filters?: { status?: string }): UseChallengesResult {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  const refetch = useCallback(() => setTick(t => t + 1), [])

  useEffect(() => {
    setLoading(true)
    setError(null)
    getChallenges(filters)
      .then(setChallenges)
      .catch(err => setError(err?.message ?? 'Failed to load challenges'))
      .finally(() => setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters?.status, tick])

  return { challenges, loading, error, refetch }
}

export function useChallenge(id: string): UseChallengeResult {
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    getChallenge(id)
      .then(setChallenge)
      .catch(err => setError(err?.message ?? 'Failed to load challenge'))
      .finally(() => setLoading(false))
  }, [id])

  return { challenge, loading, error }
}

export function useSubmissions(challengeId: string): UseSubmissionsResult {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  const refetch = useCallback(() => setTick(t => t + 1), [])

  useEffect(() => {
    if (!challengeId) return
    setLoading(true)
    setError(null)
    getSubmissions(challengeId)
      .then(setSubmissions)
      .catch(err => setError(err?.message ?? 'Failed to load submissions'))
      .finally(() => setLoading(false))
  }, [challengeId, tick])

  return { submissions, loading, error, refetch }
}
