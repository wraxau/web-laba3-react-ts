import { Link } from "react-router-dom";
import "../styles/style.css";
export default function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/">Главная</Link>
        <Link to="/weather">Погода</Link>
        <Link to="/dogs">Собаки</Link>
        <Link to="/crypto">Крипто</Link>
        <Link to="/new">Новости</Link>
      </nav>
    </header>
  );
}
