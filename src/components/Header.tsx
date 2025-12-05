import { Link } from "react-router-dom"; 
import "../styles/style.css";

interface HeaderProps {
  currentPath: string;
  isCrypto?: boolean;
}

export default function Header({ currentPath, isCrypto }: HeaderProps) {
  return (
    <header className={`header ${isCrypto ? "crypto-header" : ""}`}>
      <nav className="nav">
        <Link to="/" className={currentPath === "/" ? "active" : ""}>Главная</Link>
        <Link to="/weather" className={currentPath === "/weather" ? "active" : ""}>Погода</Link>
        <Link to="/dogs" className={currentPath === "/dogs" ? "active" : ""}>Собаки</Link>
        <Link to="/crypto" className={currentPath === "/crypto" ? "active" : ""}>Конвертер</Link>
        <Link to="/new" className={currentPath === "/new" ? "active" : ""}>Новости</Link>
      </nav>
    </header>
  );
}

