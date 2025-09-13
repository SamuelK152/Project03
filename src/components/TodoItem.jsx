export default function ToDoItem({ id, text, completed, onToggle }) {
  return (
    <li className={`todo-pill ${completed ? "done" : ""}`}>
      <span className="pill-text">{text}</span>
      <button
        type="button"
        className="pill-toggle"
        aria-pressed={completed}
        onClick={() => onToggle(id)}
        title={completed ? "Mark incomplete" : "Complete"}
      >
        {completed ? "✔" : "○"}
      </button>
    </li>
  );
}
