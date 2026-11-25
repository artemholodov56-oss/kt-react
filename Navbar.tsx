import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import "./Navbar.css";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo">
          MyReactApp
        </Link>

        <div className="nav-links">
          <Link to="/">Главная</Link>
          <Link to="/weather">Погода</Link>
          <Link to="/about">О проекте</Link>

          <button onClick={toggleTheme} className="theme-btn">
            {theme === "light" ? "Темная" : "Светлая"}
          </button>
        </div>
      </div>
    </nav>
  );
}
