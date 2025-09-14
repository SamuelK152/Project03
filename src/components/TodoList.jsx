import ToDoItem from "./TodoItem";
import "../styles/ItemList.css";

export default function ToDoList({ items = [], onToggle, onEdit, onDelete }) {
  if (!items.length) {
    return <p className="no-todo">No active TODOs</p>;
  }
  return (
    <ul className="item-list">
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
