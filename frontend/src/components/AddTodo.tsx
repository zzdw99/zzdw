import { useState, type FormEvent } from 'react'

interface Props {
  onAdd: (title: string) => void | Promise<void>
}

export function AddTodo({ onAdd }: Props) {
  const [title, setTitle] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setTitle('')
  }

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="New task title"
      />
      <button type="submit">Add</button>
    </form>
  )
}
