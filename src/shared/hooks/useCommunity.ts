import { useState, useEffect, useCallback } from 'react'
import type { CommunityMember, Contribution } from '../../entities'
import { getMembers, getMember, getContributions } from '../services/community'

interface UseMembersResult {
  members: CommunityMember[]
  loading: boolean
  error: string | null
  refetch: () => void
}

interface UseMemberResult {
  member: CommunityMember | null
  loading: boolean
  error: string | null
}

interface UseContributionsResult {
  contributions: Contribution[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useMembers(filters?: { level?: number; status?: string; search?: string }): UseMembersResult {
  const [members, setMembers] = useState<CommunityMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  const refetch = useCallback(() => setTick(t => t + 1), [])

  useEffect(() => {
    setLoading(true)
    setError(null)
    getMembers(filters)
      .then(setMembers)
      .catch(err => setError(err?.message ?? 'Failed to load members'))
      .finally(() => setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters?.level, filters?.status, filters?.search, tick])

  return { members, loading, error, refetch }
}

export function useMember(id: string): UseMemberResult {
  const [member, setMember] = useState<CommunityMember | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    getMember(id)
      .then(setMember)
      .catch(err => setError(err?.message ?? 'Failed to load member'))
      .finally(() => setLoading(false))
  }, [id])

  return { member, loading, error }
}

export function useContributions(filters?: { status?: string; type?: string }): UseContributionsResult {
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  const refetch = useCallback(() => setTick(t => t + 1), [])

  useEffect(() => {
    setLoading(true)
    setError(null)
    getContributions(filters)
      .then(setContributions)
      .catch(err => setError(err?.message ?? 'Failed to load contributions'))
      .finally(() => setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters?.status, filters?.type, tick])

  return { contributions, loading, error, refetch }
}
