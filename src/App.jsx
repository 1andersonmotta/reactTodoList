import { useState, useEffect } from 'react'
import './App.css'
import Todo from './components/Todo'
import TodoForm from './components/TodoForm'
import Search from './components/Search'
import Filter from './components/Filter'


function App() {
  const [todos, setTodos] = useState([])

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [sort, setSort] = useState('Asc')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:3000");
        if (res.ok) {
          const data = await res.json();
          setTodos(data.data);
        } else {
          console.error('Failed to fetch todos:', res.statusText);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchData();
  }, [todos]);


  const addTodo = async (text, category) => {
    const id = Math.random().toString(16)

    const res = await fetch("http://127.0.0.1:3000/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        text,
        category,
        isCompleted: false,
      })
    });

    if (res.ok) {
      const data = await res.json();
      console.log('Data received from server:', data);
      const newTodos = [
        ...todos,
        {
          id,
          text,
          category,
          isCompleted: false,
        }
      ];
      setTodos(newTodos);
    } else {
      console.error('Failed to add todo:', res.statusText);
    }
  };

  const removeTodo = async (id) => {
    await fetch(`http://127.0.0.1:3000/deleted`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
      })
    });
    const newTodos = [...todos]
    const filtreredTodos = newTodos.filter((todo) => todo.id !== id ? todo : null);
    setTodos(filtreredTodos)
  }

  const completedTodo = async (id) => {
    await fetch(`http://127.0.0.1:3000/completed`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
      })
    });

    const newTodos = [...todos]
    newTodos.map((todo) => todo.id == id ? todo.isCompleted = !todo.isCompleted : todo)
    setTodos(newTodos)
  }

  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
      <div className="todo-list">
        {todos
          .filter((todo) => filter == "All" ? true : filter === "Completed" ? todo.isCompleted : !todo.isCompleted)
          .filter((todo) => todo.text.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          )
          .sort((a, b) => sort === "Asc" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text))
          .map((todo) => (
            <Todo key={todo.id} todo={todo} removeTodo={removeTodo} completeTodo={completedTodo} />
          ))}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  )
}

export default App
