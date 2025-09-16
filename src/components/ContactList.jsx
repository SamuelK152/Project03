import ContactItem from "./ContactItem";
import "../styles/ItemList.css";

export default function ContactList({
  items = [],
  onToggleFavorite,
  onEdit,
  onDelete,
  onOpenNew,
}) {
  if (!items.length) {
    return (
      <div className="no-item">
        <p>No Contacts</p>
        {onOpenNew && (
          <button type="button" className="primary" onClick={onOpenNew}>
            Add Contact
          </button>
        )}
      </div>
    );
  }
  return (
    <ul className="item-list">
      {items.map((c) => (
        <ContactItem
          key={c.id}
          id={c.id}
          text={c.text}
          email={c.email}
          comments={c.comments}
          favorite={c.favorite}
          onToggleFavorite={onToggleFavorite}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
