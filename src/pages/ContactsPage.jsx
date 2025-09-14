import { useState, useMemo } from "react";
import ContactList from "../components/ContactList.jsx";
import ContactForm from "../components/ContactForm.jsx";

let idSeq = 3;

export default function ContactsPage() {
  const [contacts, setContacts] = useState([
    {
      id: 0,
      text: "Ada Lovelace",
      email: "ada@example.com",
      comments: "Analytical Engine pioneer",
      favorite: true,
    },
    {
      id: 1,
      text: "Grace Hopper",
      email: "grace@example.com",
      comments: "COBOL / compiler trailblazer",
      favorite: false,
    },
    {
      id: 2,
      text: "Alan Turing",
      email: "alan@example.com",
      comments: "Turing machine concept",
      favorite: false,
    },
  ]);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  function handleAdd({ text, email, comments }) {
    setContacts((prev) => [
      ...prev,
      { id: idSeq++, text, email, comments, favorite: false },
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
