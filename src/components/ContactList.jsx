import ContactItem from "./ContactItem";
import onToggleFavorite from "./ContactItem.jsx";
import "../styles/ItemList.css";

export default function ContactList({
  items = [],
  onToggleFavorite,
  onEdit,
  onDelete,
}) {
  if (!items.length) {
    return <p className="no-item">No Contacts</p>;
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
