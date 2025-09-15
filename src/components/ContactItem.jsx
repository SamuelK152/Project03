import { useState, useEffect, useRef } from "react";
import "../styles/Item.css";

export default function ContactItem({
  id,
  text,
  email,
  comments,
  favorite,
  onToggleFavorite,
  onEdit,
  onDelete,
}) {
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState(text);
  const [draftEmail, setDraftEmail] = useState(email || "");
  const [draftComments, setDraftComments] = useState(comments || "");
  const menuRef = useRef(null);
  const nameInputRef = useRef(null);

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
    if (editing && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [editing]);

  function toggleMenu(e) {
    e.stopPropagation();
    setMenuOpen((p) => !p);
  }

  function handleExpand() {
    if (editing) return;
    if (email || comments) setExpanded((p) => !p);
  }

  function startEdit(e) {
    e.stopPropagation();
    setMenuOpen(false);
    setDraftName(text);
    setDraftEmail(email || "");
    setDraftComments(comments || "");
    setEditing(true);
    setExpanded(true);
  }

  function cancelEdit(e) {
    e?.stopPropagation();
    setEditing(false);
    setDraftName(text);
    setDraftEmail(email || "");
    setDraftComments(comments || "");
  }

  function saveEdit(e) {
    e?.stopPropagation();
    const trimmedName = draftName.trim();
    if (!trimmedName) return;
    onEdit?.(id, {
      text: trimmedName,
      email: draftEmail.trim(),
      comments: draftComments.trim(),
    });
    setEditing(false);
  }

  function keyHandler(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (e.target.name !== "comments") saveEdit(e);
    } else if (e.key === "Escape") {
      cancelEdit(e);
    }
  }

  return (
    <li
      className={`item-pill ${favorite ? "favorite" : ""} ${
        expanded ? "expanded" : ""
      } ${editing ? "editing" : ""}`}
      onClick={handleExpand}
    >
      <div className="pill-row">
        <div className="pill-info">
          {!editing && (
            <span className="pill-text">
              {text}{" "}
              {favorite && (
                <span aria-label="Favorite" title="Favorite">
                  ★
                </span>
              )}
            </span>
          )}
          {!editing && expanded && (
            <div className="pill-extra">
              {email && <div className="pill-email">{email}</div>}
              {comments && <div className="pill-comments">{comments}</div>}
            </div>
          )}
        </div>
        <div className="edit-box">
          {editing && (
            <div className="pill-edit-fields">
              <input
                type="text"
                ref={nameInputRef}
                className="pill-edit"
                name="name"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                onKeyDown={keyHandler}
                placeholder="Full name"
              />
              <input
                className="pill-edit"
                name="email"
                type="email"
                value={draftEmail}
                onChange={(e) => setDraftEmail(e.target.value)}
                onKeyDown={keyHandler}
                placeholder="Email"
              />
              <input
                type="text"
                className="pill-edit"
                name="comments"
                value={draftComments}
                onChange={(e) => setDraftComments(e.target.value)}
                onKeyDown={keyHandler}
                placeholder="Comments / notes"
                rows={3}
              />
              <div className="pill-edit-actions">
                <button type="button" className="edit-save" onClick={saveEdit}>
                  Save
                </button>
                <button
                  type="button"
                  className="edit-cancel"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
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
          <button
            type="button"
            className="pill-toggle"
            aria-pressed={favorite}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(id);
            }}
            title={favorite ? "Unfavorite" : "Mark favorite"}
          >
            {favorite ? "★" : "☆"}
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
    </li>
  );
}
