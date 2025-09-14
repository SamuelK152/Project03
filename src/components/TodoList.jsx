import ToDoItem from "./TodoItem";

export default function ToDoList({ items = [], onToggle, onEdit, onDelete }) {
  if (!items.length) {
    return <p>No TODOs yet.</p>;
  }
  return (
    <ul className="todo-list">
      {items.map((item) => (
        <ToDoItem
          key={item.id}
          id={item.id}
          text={item.text}
          description={item.description}
          completed={item.completed}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
