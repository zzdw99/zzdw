import type { Todo } from './types'

const BASE = '/api/todos'

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request failed: ${res.status}`)
  }
  // 204 No Content has no body to parse.
  return res.status === 204 ? (undefined as T) : res.json()
}

export const api = {
  list(): Promise<Todo[]> {
    return fetch(BASE).then((r) => handle<Todo[]>(r))
  },

  create(title: string): Promise<Todo> {
    return fetch(BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    }).then((r) => handle<Todo>(r))
  },

  update(id: number, patch: Partial<Pick<Todo, 'title' | 'completed'>>): Promise<Todo> {
    return fetch(`${BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    }).then((r) => handle<Todo>(r))
  },

  remove(id: number): Promise<void> {
    return fetch(`${BASE}/${id}`, { method: 'DELETE' }).then((r) => handle<void>(r))
  },

  reorder(ids: number[]): Promise<Todo[]> {
    return fetch(`${BASE}/reorder`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids }),
    }).then((r) => handle<Todo[]>(r))
  },
}
