import { useState } from "react";

export default function ToDoItem({
  id,
  text,
  description,
  completed,
  onToggle,
}) {
  const [expanded, setExpanded] = useState(false);

  function handleExpand() {
    if (description) setExpanded((prev) => !prev);
  }

  return (
    <li
      className={`todo-pill ${completed ? "done" : ""} ${
        expanded ? "expanded" : ""
      }`}
      onClick={handleExpand}
    >
      <div className="pill-info">
        <div className="pill-row">
          <span className="pill-text">{text}</span>
        </div>
        {expanded && description && (
          <div className="pill-desc">{description}</div>
        )}
      </div>
      <button
        type="button"
        className="pill-toggle"
        aria-pressed={completed}
        onClick={(e) => {
          e.stopPropagation();
          onToggle(id);
        }}
        title={completed ? "Mark incomplete" : "Complete"}
      >
        {completed ? "✔" : "○"}
      </button>
    </li>
  );
}
