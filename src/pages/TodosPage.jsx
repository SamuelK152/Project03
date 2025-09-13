import ToDoList from "../components/TodoList";
import TodoForm from "../components/TodoForm.jsx";
import { useState } from "react";

export default function TodosPage() {
  const [todos, setTodos] = useState(["Buy milk", "Walk dog", "Write code"]);
  const [open, setOpen] = useState(false);

  function handleAdd(text) {
    setTodos((prev) => [...prev, text]);
  }

  return (
    <section className="todos-page">
      <h2 className="page-title">TODO List</h2>
      <ToDoList items={todos} />
      <TodoForm
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onAdd={handleAdd}
      />
    </section>
  );
}
