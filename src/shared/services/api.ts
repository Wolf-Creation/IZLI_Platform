import { environment } from '../../environments'

const API_BASE_URL = environment.apiURL.replace(/\/$/, '')

type JsonValue = Record<string, unknown> | Array<unknown> | string | number | boolean | null

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const accessToken = typeof localStorage !== 'undefined' ? localStorage.getItem('izli.accessToken') : null
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(init?.headers ?? {}),
    },
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

function uploadRequest<T>(path: string, formData: FormData, onProgress?: (progress: number) => void): Promise<T> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', `${API_BASE_URL}${path}`)

    const accessToken = typeof localStorage !== 'undefined' ? localStorage.getItem('izli.accessToken') : null
    if (accessToken) xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`)

    xhr.upload.addEventListener('progress', event => {
      if (event.lengthComputable) onProgress?.(Math.round((event.loaded / event.total) * 100))
    })
    xhr.addEventListener('error', () => reject(new Error('Upload failed. Check your connection and try again.')))
    xhr.addEventListener('abort', () => reject(new Error('Upload was cancelled.')))
    xhr.addEventListener('load', () => {
      const contentType = xhr.getResponseHeader('content-type') ?? ''
      let payload: unknown = xhr.responseText
      if (contentType.includes('application/json')) {
        try {
          payload = JSON.parse(xhr.responseText)
        } catch {
          payload = null
        }
      }

      if (xhr.status < 200 || xhr.status >= 300) {
        reject(new Error((payload as { message?: string } | null)?.message ?? 'Upload failed.'))
        return
      }

      onProgress?.(100)
      resolve(contentType.includes('application/json') ? (payload as { data?: T }).data as T : payload as T)
    })
    xhr.send(formData)
  })
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: JsonValue) => request<T>(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body ?? {}) }),
  patch: <T>(path: string, body?: JsonValue) => request<T>(path, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body ?? {}) }),
  put: <T>(path: string, body?: JsonValue) => request<T>(path, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body ?? {}) }),
  del: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
  upload: <T>(path: string, formData: FormData, onProgress?: (progress: number) => void) => uploadRequest<T>(path, formData, onProgress),
}