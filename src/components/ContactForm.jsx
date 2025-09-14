import { useState, useEffect, useRef } from "react";
import "../styles/Form.css";

export default function ContactForm({ open, onOpen, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({
      text: name.trim(),
      email: email.trim(),
      comments: comments.trim(),
    });
    setName("");
    setEmail("");
    setComments("");
    onClose();
  }

  return (
    <>
      <aside className={`form-drawer handle-right ${open ? "open" : ""}`}>
        <div className="drawer-body">
          <h3>New Contact</h3>
          <form onSubmit={handleSubmit} className="new-form">
            <label>
              <span>Name</span>
              <input
                ref={inputRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
            </label>
            <label>
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="someone@email.com"
              />
            </label>
            <label>
              <span>Comments</span>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Notes"
                rows={3}
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
          aria-label={
            open ? "Close new contact panel" : "Open new contact panel"
          }
          onClick={open ? onClose : onOpen}
        >
          <span className="handle-icon">{open ? "×" : "+"}</span>
        </button>
      </aside>
      {open && <div className="drawer-backdrop" onClick={onClose} />}
    </>
  );
}
