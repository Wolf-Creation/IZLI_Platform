import { useState, useEffect, useCallback } from 'react'
import type { Order } from '../../entities'
import { getOrders, getOrder } from '../services/orders'

interface UseOrdersResult {
  orders: Order[]
  loading: boolean
  error: string | null
  refetch: () => void
}

interface UseOrderResult {
  order: Order | null
  loading: boolean
  error: string | null
}

export function useOrders(filters?: { status?: string; customerId?: string }): UseOrdersResult {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  const refetch = useCallback(() => setTick(t => t + 1), [])

  useEffect(() => {
    setLoading(true)
    setError(null)
    getOrders(filters)
      .then(setOrders)
      .catch(err => setError(err?.message ?? 'Failed to load orders'))
      .finally(() => setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters?.status, filters?.customerId, tick])

  return { orders, loading, error, refetch }
}

export function useOrder(id: string): UseOrderResult {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    getOrder(id)
      .then(setOrder)
      .catch(err => setError(err?.message ?? 'Failed to load order'))
      .finally(() => setLoading(false))
  }, [id])

  return { order, loading, error }
}
