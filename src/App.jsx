import { useState } from 'react'
import './App.css'
import Todo from './components/Todo'

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: 'Criar funcionalidade X no sistema',
      category: 'Trabalho',
      isCompleted: false,
    },
    {
      id: 2,
      text: 'Ir para academia',
      category: 'Pessoal',
      isCompleted: false,
    },
    {
      id: 3,
      text: 'Estudar REACT',
      category: 'Estudos',
      isCompleted: false,
    },
  ])

  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>
      <div className="todo-list">
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  )
}

export default App
