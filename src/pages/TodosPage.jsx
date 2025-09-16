import { useState, useMemo, useEffect, useRef } from "react";
import ToDoList from "../components/TodoList.jsx";
import TodoForm from "../components/TodoForm.jsx";

const STORAGE_KEY = "todos.v1";

export default function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) setTodos(saved);
    } catch {
      setTodos([]);
    }
  }, []);

  useEffect(() => {
    if (!loadedRef.current) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function newId() {
    return crypto.randomUUID
      ? crypto.randomUUID()
      : "t_" + Math.random().toString(36).slice(2);
  }

  function handleAdd({ text, description }) {
    setTodos((prev) => [
      ...prev,
      { id: newId(), text, description, completed: false },
    ]);
  }

  function handleToggle(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function handleEdit(id, updates) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }

  function handleDelete(id) {
    const todo = todos.find((t) => t.id === id);
    if (!window.confirm("Delete this TODO?")) return;
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((t) => !t.completed);
      case "completed":
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const counts = useMemo(
    () => ({
      total: todos.length,
      active: todos.filter((t) => !t.completed).length,
      completed: todos.filter((t) => t.completed).length,
    }),
    [todos]
  );

  return (
    <section className="todos-page">
      <div className="header-row">
        <div className="item-filters">
          <label>
            <span className="visually-hidden">Filter</span>
            <select
              className="dropdown"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All ({counts.total})</option>
              <option value="active">Active ({counts.active})</option>
              <option value="completed">Completed ({counts.completed})</option>
            </select>
          </label>
        </div>
        <h2 className="page-title">TODO List</h2>
      </div>

      <ToDoList
        items={visibleTodos}
        onToggle={handleToggle}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onOpenNew={() => setOpen(true)}
      />
      <TodoForm
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onAdd={handleAdd}
      />
    </section>
  );
}
