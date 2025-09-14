import ContactItem from "./ContactItem";
import "../styles/ItemList.css";

export default function ContactList({
  items = [],
  onToggle,
  onEdit,
  onDelete,
}) {
  if (!items.length) {
    return <p className="no-contact">No Contacts</p>;
  }
  return (
    <ul className="item-list">
      {items.map((item) => (
        <ContactItem
          key={item.id}
          id={item.id}
          text={item.text}
          description={item.description}
          completed={item.completed}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
