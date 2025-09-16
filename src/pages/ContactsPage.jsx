import { useState, useMemo, useEffect, useRef } from "react";
import ContactList from "../components/ContactList.jsx";
import ContactForm from "../components/ContactForm.jsx";

const STORAGE_KEY = "contacts.v1";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) setContacts(saved);
    } catch {
      setContacts([]);
    }
  }, []);

  useEffect(() => {
    if (!loadedRef.current) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  function newId() {
    return crypto.randomUUID
      ? crypto.randomUUID()
      : "c_" + Math.random().toString(36).slice(2);
  }

  function handleAdd({ text, email, comments }) {
    setContacts((prev) => [
      ...prev,
      { id: newId(), text, email, comments, favorite: false },
    ]);
  }

  function handleToggleFavorite(id) {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c))
    );
  }

  function handleEdit(id, updates) {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  }

  function handleDelete(id) {
    const contact = contacts.find((c) => c.id === id);
    if (!window.confirm("Delete this contact?")) return;
    setContacts((prev) => prev.filter((c) => c.id !== id));
  }

  const visibleContacts = useMemo(() => {
    switch (filter) {
      case "favorites":
        return contacts.filter((c) => c.favorite);
      default:
        return contacts;
    }
  }, [contacts, filter]);

  const counts = useMemo(
    () => ({
      total: contacts.length,
      active: contacts.filter((c) => !c.favorite).length,
    }),
    [contacts]
  );

  return (
    <section className="contacts-page">
      <div className="header-row">
        <div className="item-filters">
          <label>
            <span className="visually-hidden">Filter</span>
            <select
              className="dropdown"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All ({counts.total})</option>
              <option value="favorites">Favorites ({counts.favorites})</option>
            </select>
          </label>
        </div>
        <h2 className="page-title">Contacts</h2>
      </div>

      <ContactList
        items={visibleContacts}
        onToggleFavorite={handleToggleFavorite}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ContactForm
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onAdd={handleAdd}
      />
    </section>
  );
}
