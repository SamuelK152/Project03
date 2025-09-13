import { useState } from "react";
import ToDoList from "../components/TodoList";
import TodoForm from "../components/TodoForm.jsx";

let idSeq = 3;

export default function TodosPage() {
  const [todos, setTodos] = useState([
    {
      id: 0,
      text: "Buy milk",
      description: "2% from the store",
      completed: false,
    },
    {
      id: 1,
      text: "Walk dog",
      description: "30 min after work",
      completed: true,
    },
    {
      id: 2,
      text: "Write code",
      description: "Finish Todo App",
      completed: false,
    },
  ]);
  const [open, setOpen] = useState(false);

  function handleAdd({ text, description }) {
    setTodos((prev) => [
      ...prev,
      { id: idSeq++, text, description, completed: false },
    ]);
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
