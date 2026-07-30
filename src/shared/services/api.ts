const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) || '/api'

type JsonValue = Record<string, unknown> | Array<unknown> | string | number | boolean | null

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  const contentType = response.headers.get('content-type') ?? ''
  const payload = contentType.includes('application/json') ? await response.json().catch(() => null) : await response.text().catch(() => null)

  if (!response.ok) {
    throw new Error((payload as { message?: string } | null)?.message ?? 'Request failed')
  }

  if (contentType.includes('application/json')) {
    return (payload as { data?: T }).data as T
  }

  return payload as T
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: JsonValue) => request<T>(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body ?? {}) }),
  patch: <T>(path: string, body?: JsonValue) => request<T>(path, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body ?? {}) }),
  del: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
  upload: <T>(path: string, formData: FormData) => request<T>(path, { method: 'POST', body: formData }),
}