import React from "react";

const TodoList = (props) => {
  const { todos, setTodos, setEditTodo } = props;
  //delete
  const handleDelete = ({ id }) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  };
  //update
  const handleComplete = (todo) => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  const handleEdit = ({ id }) => {
    const findTodo = todos.find((todo) => {
      return todo.id === id;
    });
    setEditTodo(findTodo);
  };
  return (
    <div>
      <ul>
        {todos.map((todo) => {
          return (
            <li className="list-item" key={todo.id}>
              <input
                type="text"
                value={todo.title}
                className={`list ${todo.completed ? "complete" : ""}`}
                onChange={(e) => e.preventDefault()}
              />
              <div>
                <button
                  className="button-complete task-button"
                  onClick={() => handleComplete(todo)}
                >
                  <i className="bi bi-check">complete</i>
                </button>
                <button
                  className="button-edit task-button"
                  onClick={() => handleEdit(todo)}
                >
                  <i className="fa fa-chech-circle">edit</i>
                </button>
                <button
                  className="button-delete task-button"
                  onClick={() => handleDelete(todo)}
                >
                  <i className="fa fa-chech-circle">delete</i>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
