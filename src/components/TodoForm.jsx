import { useState, useEffect, useRef } from "react";

export default function TodoForm({ open, onOpen, onClose, onAdd }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
    onClose();
  }

  return (
    <>
      <aside
        ref={drawerRef}
        className={`todo-drawer handle-right ${open ? "open" : ""}`}
      >
        <div className="drawer-body">
          <h3>New Todo</h3>
          <form onSubmit={handleSubmit} className="todo-form">
            <label>
              <span>Task</span>
              <input
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="e.g. Buy milk"
              />
            </label>
            <div className="drawer-actions">
              <button type="submit" className="primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <button
          type="button"
          className="drawer-handle-btn"
          aria-label={open ? "Close new todo panel" : "Open new todo panel"}
          onClick={open ? onClose : onOpen}
        >
          <span className="handle-icon">{open ? "×" : "+"}</span>
        </button>
      </aside>
      {open && <div className="drawer-backdrop" onClick={onClose} />}
    </>
  );
}
