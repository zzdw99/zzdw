import type { Todo } from '../types'
import { TodoItem } from './TodoItem'

interface Props {
  todos: Todo[]
  onToggle: (todo: Todo) => void
  onDelete: (todo: Todo) => void
}

export function TodoList({ todos, onToggle, onDelete }: Props) {
  if (todos.length === 0) {
    return <p className="empty">Nothing here yet. Add your first task above. 🎉</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  )
}
