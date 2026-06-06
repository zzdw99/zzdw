import { useState, type KeyboardEvent } from 'react'
import type { Todo } from '../types'

interface Props {
  todo: Todo
  draggable: boolean
  dragging: boolean
  onToggle: (todo: Todo) => void
  onDelete: (todo: Todo) => void
  onEdit: (todo: Todo, title: string) => void
  onDragStart: (todo: Todo) => void
  onDragOver: (todo: Todo) => void
  onDragEnd: () => void
}

export function TodoItem({
  todo,
  draggable,
  dragging,
  onToggle,
  onDelete,
  onEdit,
  onDragStart,
  onDragOver,
  onDragEnd,
}: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(todo.title)

  function startEdit() {
    setDraft(todo.title)
    setEditing(true)
  }

  function commit() {
    const trimmed = draft.trim()
    if (trimmed && trimmed !== todo.title) {
      onEdit(todo, trimmed)
    }
    setEditing(false)
  }

  function cancel() {
    setDraft(todo.title)
    setEditing(false)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') commit()
    else if (e.key === 'Escape') cancel()
  }

  return (
    <li
      className={
        'todo-item' +
        (todo.completed ? ' completed' : '') +
        (dragging ? ' dragging' : '') +
        (draggable && !editing ? ' draggable' : '')
      }
      draggable={draggable && !editing}
      onDragStart={() => onDragStart(todo)}
      onDragOver={(e) => {
        e.preventDefault()
        onDragOver(todo)
      }}
      onDragEnd={onDragEnd}
      onDrop={(e) => e.preventDefault()}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo)}
      />

      {editing ? (
        <input
          className="edit"
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commit}
          aria-label="编辑待办"
        />
      ) : (
        <span
          className="title"
          onDoubleClick={startEdit}
          title="双击编辑"
        >
          {todo.title}
        </span>
      )}

      <button
        className="delete"
        onClick={() => onDelete(todo)}
        aria-label={`删除 ${todo.title}`}
      >
        ✕
      </button>
    </li>
  )
}
