import ToDoItem from "./TodoItem";

export default function ToDoList({ items = [] }) {
  if (!items.length) {
    return <p>No TODOs yet.</p>;
  }
  return (
    <ul>
      {items.map((t, i) => (
        <ToDoItem key={i} text={t} />
      ))}
    </ul>
  );
}
