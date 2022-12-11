import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")

  const onAddTodo = (e) => {
    e.preventDefault()
    const newTodo = {
      id: uuidv4(),
      text: todo,
      complete: false,
    }
    if (todo === "") return
    setTodos([...todos, newTodo])
    setTodo("")
  }

  const onCompleteTodo = (id) => {
    // Update the complete property of the todo with the given id
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, complete: true } : todo
    )
    setTodos(updatedTodos)
  }

  const onUndoTodo = (id) => {
    // Update the complete property of the todo with the given id
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, complete: false } : todo
    )
    setTodos(updatedTodos)
  }

  const onDeleteTodo = (id) => {
    // Remove the todo with the given id
    const updatedTodos = todos.filter((todo) => todo.id !== id)
    setTodos(updatedTodos)
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={onAddTodo}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      {todos.filter((todo) => !todo.complete).length > 0 && <h2>Incomplete</h2>}
      <ul>
        {todos
          .filter((todo) => !todo.complete)
          .map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => onCompleteTodo(todo.id)}>Complete</button>
            </li>
          ))}
      </ul>
      {todos.filter((todo) => todo.complete).length > 0 && <h2>Complete</h2>}
      <ul>
        {todos
          .filter((todo) => todo.complete)
          .map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => onUndoTodo(todo.id)}>Undo</button>
              <button onClick={() => onDeleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default App
