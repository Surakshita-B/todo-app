import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./TodoList";

const Form = (props) => {
  const initialState = JSON.parse(localStorage.getItem("todos")) || [];
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title);
    } else {
      setInput("");
    }
  }, [setInput, editTodo]);

  const updateTodo = (title, id, completed) => {
    const newTodo = todos.map((todo) => {
      return todo.id === id ? { title, id, completed } : todo;
    });
    setTodos(newTodo);
    setEditTodo("");
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editTodo) {
      setTodos([...todos, { id: uuidv4(), title: input, completed: false }]);
      setInput("");
    } else {
      updateTodo(input, editTodo.id, editTodo.completed);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a Todo..."
          className="task-input"
          value={input}
          required
          onChange={handleInputChange}
        />
        <button className="button-add" type="submit">
          {editTodo ? "OK" : "Add"}
        </button>
      </form>
      <TodoList todos={todos} setTodos={setTodos} setEditTodo={setEditTodo} />
    </div>
  );
};

export default Form;
