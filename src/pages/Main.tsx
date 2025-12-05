import React from "react";
import { Link } from "react-router-dom"; 
import "../styles/style.css"; 
import "../styles/main.css";

interface SectionCardProps {
  emoji: string;
  title: string;
  subtitle: string;
  link: string;
}

const SectionCard: React.FC<SectionCardProps> = ({ emoji, title, subtitle, link }) => {
  return (
    <div className="card">
      <span className="icon">{emoji}</span>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <Link to={link} className="btn">Открыть</Link>
    </div>
  );
};

export default function Main() {
  return (
    <div className="home-container">
      <header>
        <h1>Добро пожаловать! 🌐</h1>
        <p className="subtitle">Исследуй открытые API через наше приложение</p>
      </header>

      <div className="cards">
        <SectionCard emoji="🌤️" title="Погода" subtitle="Узнай текущую погоду в любом городе мира" link="/weather" />
        <SectionCard emoji="🐶" title="Случайная собака" subtitle="Посмотри на милую собаку" link="/dogs" />
        <SectionCard emoji="💱" title="Крипто-конвертер" subtitle="Следи за курсом криптовалют" link="/crypto" />
        <SectionCard emoji="🌌" title="Новости про космос" subtitle="Узнай лучшие новости про космос" link="/new" />
      </div>

      <div className="credits-marquee">
        <div className="credits-content">
          Проект выполнили: Муслин Артемий, Шабаркина Дарья, Языкова Мария, Яшина
          Нина
        </div>
      </div>
    </div>
  );
}