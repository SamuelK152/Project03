import ToDoList from "../components/TodoList";
import TodoForm from "../components/TodoForm.jsx";
import { useState } from "react";

let idSeq = 3;

export default function TodosPage() {
  const [todos, setTodos] = useState([
    { id: 0, text: "Buy milk", completed: false },
    { id: 1, text: "Walk dog", completed: true },
    { id: 2, text: "Write code", completed: false },
  ]);
  const [open, setOpen] = useState(false);

  function handleAdd(text) {
    setTodos((prev) => [...prev, { id: idSeq++, text, completed: false }]);
  }

  function handleToggle(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  return (
    <section className="todos-page">
      <h2 className="page-title">TODO List</h2>
      <ToDoList items={todos} onToggle={handleToggle} />
      <TodoForm
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onAdd={handleAdd}
      />
    </section>
  );
}
