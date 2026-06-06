import type { Todo } from '../types'
import { TodoItem } from './TodoItem'

interface Props {
  todos: Todo[]
  draggable: boolean
  dragId: number | null
  onToggle: (todo: Todo) => void
  onDelete: (todo: Todo) => void
  onEdit: (todo: Todo, title: string) => void
  onDragStart: (todo: Todo) => void
  onDragOver: (todo: Todo) => void
  onDragEnd: () => void
}

export function TodoList({
  todos,
  draggable,
  dragId,
  onToggle,
  onDelete,
  onEdit,
  onDragStart,
  onDragOver,
  onDragEnd,
}: Props) {
  if (todos.length === 0) {
    return <p className="empty">这里还空空如也，在上面添加第一项吧 🎉</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          draggable={draggable}
          dragging={dragId === todo.id}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
        />
      ))}
    </ul>
  )
}
