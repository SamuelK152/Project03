import ToDoList from "../components/TodoList";
import { useState } from "react";

export default function TodosPage() {
  const [todos] = useState(["Buy milk", "Walk dog", "Write code"]);

  return (
    <section>
      <h2>TODO List</h2>
      <ToDoList items={todos} />
    </section>
  );
}
