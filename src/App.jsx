import { Routes, Route, Navigate } from "react-router-dom";
import "./styles/App.css";
import NavBar from "./components/Navbar.jsx";
import TodosPage from "./pages/TodosPage.jsx";
import ContactsPage from "./pages/ContactsPage.jsx";

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/todos" replace />} />
          <Route path="/todos" element={<TodosPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="*" element={<h2>Not Found</h2>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
