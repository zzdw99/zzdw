import { useEffect, useMemo, useState } from 'react'
import { api } from './api'
import type { Todo } from './types'
import { AddTodo } from './components/AddTodo'
import { TodoList } from './components/TodoList'
import './App.css'

type Filter = 'all' | 'active' | 'completed'

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'active', label: '进行中' },
  { key: 'completed', label: '已完成' },
]

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Filter>('all')
  const [dragId, setDragId] = useState<number | null>(null)

  useEffect(() => {
    api
      .list()
      .then(setTodos)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  async function handleAdd(title: string) {
    try {
      const created = await api.create(title)
      setTodos((prev) => [created, ...prev])
    } catch (e) {
      setError((e as Error).message)
    }
  }

  async function handleToggle(todo: Todo) {
    try {
      const updated = await api.update(todo.id, { completed: !todo.completed })
      setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
    } catch (e) {
      setError((e as Error).message)
    }
  }

  async function handleEdit(todo: Todo, title: string) {
    try {
      const updated = await api.update(todo.id, { title })
      setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
    } catch (e) {
      setError((e as Error).message)
    }
  }

  async function handleDelete(todo: Todo) {
    try {
      await api.remove(todo.id)
      setTodos((prev) => prev.filter((t) => t.id !== todo.id))
    } catch (e) {
      setError((e as Error).message)
    }
  }

  async function handleClearCompleted() {
    const done = todos.filter((t) => t.completed)
    if (done.length === 0) return
    try {
      await Promise.all(done.map((t) => api.remove(t.id)))
      setTodos((prev) => prev.filter((t) => !t.completed))
    } catch (e) {
      setError((e as Error).message)
    }
  }

  // ---- Drag-and-drop reordering (only meaningful in the "all" view) ----
  function handleDragStart(todo: Todo) {
    setDragId(todo.id)
  }

  function handleDragOver(over: Todo) {
    if (dragId === null || dragId === over.id) return
    setTodos((prev) => {
      const from = prev.findIndex((t) => t.id === dragId)
      const to = prev.findIndex((t) => t.id === over.id)
      if (from === -1 || to === -1) return prev
      const next = [...prev]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
  }

  async function handleDragEnd() {
    setDragId(null)
    try {
      await api.reorder(todos.map((t) => t.id))
    } catch (e) {
      setError((e as Error).message)
    }
  }

  const remaining = todos.filter((t) => !t.completed).length
  const completed = todos.length - remaining
  const canDrag = filter === 'all'

  const visible = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed)
    if (filter === 'completed') return todos.filter((t) => t.completed)
    return todos
  }, [todos, filter])

  return (
    <main className="app">
      <header className="app-header">
        <h1>✨ 我的待办</h1>
        <p className="subtitle">
          {loading ? '加载中…' : `还有 ${remaining} 项待完成`}
        </p>
      </header>

      <section className="card">
        <AddTodo onAdd={handleAdd} />

        {error && <p className="error">⚠️ {error}</p>}

        <nav className="filters">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`filter${filter === f.key ? ' active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </nav>

        {loading ? (
          <p className="empty">加载中…</p>
        ) : (
          <TodoList
            todos={visible}
            draggable={canDrag}
            dragId={dragId}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          />
        )}

        {todos.length > 0 && (
          <footer className="summary">
            <span>
              {remaining} 项进行中 · {completed} 项已完成
            </span>
            <button
              className="clear"
              onClick={handleClearCompleted}
              disabled={completed === 0}
            >
              清除已完成
            </button>
          </footer>
        )}
      </section>

      <p className="hint">提示：双击可编辑 · 拖拽可排序（仅「全部」视图）</p>
    </main>
  )
}
