import ToDoItem from "./TodoItem";
import "../styles/ItemList.css";

export default function ToDoList({
  items = [],
  onToggle,
  onEdit,
  onDelete,
  onOpenNew,
}) {
  if (!items.length) {
    return (
      <div className="no-item">
        <p>No active TODOs</p>
        {onOpenNew && (
          <button type="button" className="primary" onClick={onOpenNew}>
            Add TODO
          </button>
        )}
      </div>
    );
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
