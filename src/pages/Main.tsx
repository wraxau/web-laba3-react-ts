import React from "react";
import "../styles/style.css"; 
import "../styles/main.css";

interface SectionButtonProps {
  emoji: string;
  label: string;
  link: string;
}

const SectionButton: React.FC<SectionButtonProps> = ({ emoji, label, link }) => {
  return (
    <a href={link} className="section-button">
      <span className="emoji">{emoji}</span>
      <span className="label">{label}</span>
    </a>
  );
};

export default function Main() {
  return (
    <div className="home-container">
      <h1>Главная страница</h1>
      <div className="buttons-wrapper">
        <SectionButton emoji="🌤️" label="Погода" link="/weather" />
        <SectionButton emoji="💰" label="Конвертер" link="/crypto" />
        <SectionButton emoji="🐶" label="Собаки" link="/dogs" />
        <SectionButton emoji="📰" label="Новости" link="/new" />
      </div>
    </div>
  );
}
