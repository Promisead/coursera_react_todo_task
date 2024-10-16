import React, { useState, useEffect } from "react";
import "./App.css";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState(""); // For adding a new todo
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState(""); // For editing a todo

  // Load todos from localStorage when the component mounts
  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  // Save todos to localStorage whenever the todos state changes
  useEffect(() => {
    if (todos.length > 0) {
      const json = JSON.stringify(todos);
      localStorage.setItem("todos", json);
    }
  }, [todos]);

  // Handle adding a new todo
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todoInput.trim(),
      completed: false,
    };

    if (newTodo.text.length > 0) {
      setTodos([...todos, newTodo]);
      setTodoInput(""); // Clear the input field after submission
    } else {
      alert("Enter a valid task");
    }
  };

  // Handle deleting a todo
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Handle toggling todo completion
  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Handle submitting edits to a todo
  const submitEdits = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: editingText };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null); // Exit editing mode
  };

  return (
    <div id="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todoInput} // Controlled input
          onChange={(e) => setTodoInput(e.target.value)} // Update input state
        />
        <button type="submit">Add Todo</button>
      </form>

      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
            {/* Checkbox for toggle complete */}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {/* If it is edit mode, display input box, else display text */}
            {todo.id === todoEditing ? (
              <input
                type="text"
                value={editingText} // Controlled input for editing
                onChange={(e) => setEditingText(e.target.value)} // Update editing state
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {/* If it is edit mode, allow submit edit, else allow edit */}
            {todo.id === todoEditing ? (
              <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
            ) : (
              <button onClick={() => {
                setTodoEditing(todo.id); // Enter editing mode
                setEditingText(todo.text); // Set the initial value to edit
              }}>
                Edit
              </button>
            )}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todo;
