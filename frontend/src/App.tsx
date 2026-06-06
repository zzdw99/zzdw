import { useEffect, useState } from 'react'
import { api } from './api'
import type { Todo } from './types'
import { AddTodo } from './components/AddTodo'
import { TodoList } from './components/TodoList'
import './App.css'

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

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

  async function handleDelete(todo: Todo) {
    try {
      await api.remove(todo.id)
      setTodos((prev) => prev.filter((t) => t.id !== todo.id))
    } catch (e) {
      setError((e as Error).message)
    }
  }

  const remaining = todos.filter((t) => !t.completed).length

  return (
    <main className="app">
      <h1>📝 Todo List</h1>
      <AddTodo onAdd={handleAdd} />

      {error && <p className="error">⚠️ {error}</p>}

      {loading ? (
        <p className="empty">Loading…</p>
      ) : (
        <>
          <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
          {todos.length > 0 && (
            <footer className="summary">
              {remaining} of {todos.length} remaining
            </footer>
          )}
        </>
      )}
    </main>
  )
}
