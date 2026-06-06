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
        placeholder="想做点什么？"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="新待办内容"
      />
      <button type="submit" aria-label="添加">＋</button>
    </form>
  )
}
