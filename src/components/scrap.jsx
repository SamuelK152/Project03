import { useState, useEffect, useRef } from "react";

export default function ToDoItem({
  id,
  text,
  description,
  completed,
  onToggle,
  onEdit,
  onDelete,
}) {
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draftText, setDraftText] = useState(text);
  const [draftDesc, setDraftDesc] = useState(description || "");
  const menuRef = useRef(null);
  const textInputRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    function handleDoc(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleDoc);
    return () => document.removeEventListener("mousedown", handleDoc);
  }, [menuOpen]);

  // Focus first input when entering edit mode
  useEffect(() => {
    if (editing && textInputRef.current) {
      textInputRef.current.focus();
      textInputRef.current.select();
    }
  }, [editing]);

  function toggleMenu(e) {
    e.stopPropagation();
    setMenuOpen((p) => !p);
  }

  function handleExpand() {
    if (editing) return;
    if (description) setExpanded((p) => !p);
  }

  function startEdit(e) {
    e.stopPropagation();
    setMenuOpen(false);
    setDraftText(text);
    setDraftDesc(description || "");
    setEditing(true);
    setExpanded(true);
  }

  function cancelEdit(e) {
    e?.stopPropagation();
    setEditing(false);
    setDraftText(text);
    setDraftDesc(description || "");
  }

  function saveEdit(e) {
    e?.stopPropagation();
    const trimmedTitle = draftText.trim();
    if (!trimmedTitle) return;
    onEdit?.(id, {
      text: trimmedTitle,
      description: draftDesc.trim(),
    });
    setEditing(false);
  }

  function keyHandler(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      saveEdit(e);
    } else if (e.key === "Escape") {
      cancelEdit(e);
    }
  }

  return (
    <li
      className={`todo-pill ${completed ? "done" : ""} ${
        expanded ? "expanded" : ""
      } ${editing ? "editing" : ""}`}
      onClick={handleExpand}
    >
      <div className="pill-row">
        <button
          type="button"
          className="pill-toggle"
          aria-pressed={completed}
          onClick={(e) => {
            e.stopPropagation();
            onToggle(id);
          }}
          title={completed ? "Mark incomplete" : "Mark complete"}
        >
          {completed ? "✔" : "○"}
        </button>

        {!editing && <span className="pill-text">{text}</span>}

        {editing && (
          <input
            ref={textInputRef}
            className="pill-edit-title"
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            onKeyDown={keyHandler}
            placeholder="Title"
          />
        )}

        <div className="pill-actions" ref={menuRef}>
          <button
            type="button"
            className="pill-menu-btn"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
            title="Options"
          >
            …
          </button>
          {menuOpen && (
            <ul className="pill-menu" role="menu">
              {!editing && (
                <li>
                  <button type="button" role="menuitem" onClick={startEdit}>
                    Edit
                  </button>
                </li>
              )}
              <li>
                <button
                  type="button"
                  role="menuitem"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(false);
                    onDelete?.(id);
                  }}
                >
                  Delete
                </button>
              </li>
              {editing && (
                <li>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={(e) => {
                      e.stopPropagation();
                      saveEdit(e);
                      setMenuOpen(false);
                    }}
                  >
                    Save
                  </button>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>

      {editing && (
        <div className="pill-desc-edit">
          <textarea
            className="pill-edit-desc"
            value={draftDesc}
            onChange={(e) => setDraftDesc(e.target.value)}
            onKeyDown={keyHandler}
            placeholder="Description (optional)"
            rows={3}
          />
          <div className="pill-edit-actions">
            <button type="button" className="edit-save" onClick={saveEdit}>
              Save
            </button>
            <button type="button" className="edit-cancel" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {!editing && expanded && description && (
        <div className="pill-desc">{description}</div>
      )}
    </li>
  );
}
