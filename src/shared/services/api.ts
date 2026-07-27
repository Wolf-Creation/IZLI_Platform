const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) || '/api'

type JsonValue = Record<string, unknown> | Array<unknown> | string | number | boolean | null

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error((payload as { message?: string } | null)?.message ?? 'Request failed')
  }

  return (payload as { data?: T }).data as T
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: JsonValue) => request<T>(path, { method: 'POST', body: JSON.stringify(body ?? {}) }),
  patch: <T>(path: string, body?: JsonValue) => request<T>(path, { method: 'PATCH', body: JSON.stringify(body ?? {}) }),
  del: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
}