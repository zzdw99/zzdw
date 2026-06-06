import type { Todo } from '../types'

interface Props {
  todo: Todo
  onToggle: (todo: Todo) => void
  onDelete: (todo: Todo) => void
}

export function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li className={`todo-item${todo.completed ? ' completed' : ''}`}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo)}
        />
        <span className="title">{todo.title}</span>
      </label>
      <button
        className="delete"
        onClick={() => onDelete(todo)}
        aria-label={`Delete ${todo.title}`}
      >
        ✕
      </button>
    </li>
  )
}
