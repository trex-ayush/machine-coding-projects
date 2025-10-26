import React, { useState, useEffect } from "react";
import "./App.css";
const App = () => {
  const [todo, setTodo] = useState(() => {
    const savedTodos = localStorage.getItem("todo");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(todo);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  useEffect(() => {
    setFilteredData(
      todo.filter((task) =>
        task.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [todo, search]);

  const handleAddButton = () => {
    if (input.trim() === "") return;
    setTodo([...todo, { id: Date.now(), name: input, done: false }]);
    setInput("");
  };

  const handleDelete = (id) => {
    const updatedTodo = todo.filter((data) => data.id !== id);
    setTodo(updatedTodo);
  };

  const handleDone = (id) => {
    const updatedTodo = todo.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTodo(updatedTodo);
  };

  return (
    <div className="app-container">
      <h1>📝 TO DO APP</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter the task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddButton()}
        />
        <button onClick={handleAddButton}>Add</button>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ul>
        {filteredData.map((data) => (
          <li
            key={data.id}
            style={{
              textDecoration: data.done ? "line-through" : "none",
              opacity: data.done ? 0.6 : 1,
            }}
          >
            <span>{data.name}</span>
            <div className="task-buttons">
              <button onClick={() => handleDelete(data.id)}>Delete</button>
              <button onClick={() => handleDone(data.id)}>
                {data.done ? "Undo" : "Done"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
