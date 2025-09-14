import { useState, useMemo } from "react";
import ContactList from "../components/ContactList.jsx";
import ContactForm from "../components/ContactForm.jsx";

let idSeq = 3;

export default function ContactsPage() {
  const [contacts, setContacts] = useState([
    {
      id: 0,
      text: "Buy milk",
      description: "2% from the store",
      completed: false,
    },
    {
      id: 1,
      text: "Walk dog",
      description: "30 min after work",
      completed: true,
    },
    {
      id: 2,
      text: "Write code",
      description: "Finish Todo App",
      completed: false,
    },
  ]);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  function handleAdd({ text, description }) {
    setContacts((prev) => [
      ...prev,
      { id: idSeq++, text, description, completed: false },
    ]);
  }

  function handleToggle(id) {
    setContacts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function handleEdit(id, updates) {
    setContacts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }

  function handleDelete(id) {
    const contact = contacts.find((t) => t.id === id);
    if (!window.confirm("Delete this contact?")) return;
    setContacts((prev) => prev.filter((t) => t.id !== id));
  }

  const visibleContacts = useMemo(() => {
    switch (filter) {
      case "active":
        return contacts.filter((t) => !t.completed);
      case "completed":
        return contacts.filter((t) => t.completed);
      default:
        return contacts;
    }
  }, [contacts, filter]);

  const counts = useMemo(
    () => ({
      total: contacts.length,
      active: contacts.filter((t) => !t.completed).length,
      completed: contacts.filter((t) => t.completed).length,
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
              <option value="active">Active ({counts.active})</option>
              <option value="completed">Completed ({counts.completed})</option>
            </select>
          </label>
        </div>
        <h2 className="page-title">Contacts</h2>
      </div>

      <ContactList
        items={visibleContacts}
        onToggle={handleToggle}
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
