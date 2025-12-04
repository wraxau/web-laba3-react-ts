import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={{ padding: 20, backgroundColor: "#f0f0f0" }}>
      <nav style={{ display: "flex", gap: 10 }}>
        <Link to="/">Главная</Link>
        <Link to="/weather">Погода</Link>
        <Link to="/dogs">Собаки</Link>
        <Link to="/crypto">Крипто</Link>
        <Link to="/new">Новости</Link>
      </nav>
    </header>
  );
}
