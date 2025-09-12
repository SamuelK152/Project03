import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <header>
      <h1 id="logo">TODO MANAGER</h1>
      <nav className="nav-buttons">
        <NavLink
          to="/todos"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          TODO List
        </NavLink>
        <NavLink
          to="/contacts"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Contacts
        </NavLink>
      </nav>
    </header>
  );
}
