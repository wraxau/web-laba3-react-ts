// src/App.tsx
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Weather from "./pages/Weather";
import Dogs from "./pages/Dogs";
import Crypto from "./pages/Crypto";
import New from "./pages/New";
import Main from "./pages/Main";

function FaviconManager() {
  const location = useLocation();

  useEffect(() => {
    const favicon = document.querySelector<HTMLLinkElement>("link[rel='icon']") || document.createElement("link");
    favicon.rel = "icon";

    let emoji = "🌐";
    let title = "Главная";
    switch (location.pathname) {
      case "/weather":
        emoji = "🌤️";
        title = "Погода";
        break;
      case "/dogs":
        emoji = "🐶";
        title = "Собаки";
        break;
      case "/crypto":
        emoji = "💱";
        title = "Крипто";
        break;
      case "/new":
        emoji = "🌌";
        title = "Новости";
        break;
      default:
        emoji = "🌐";
        title = "Главная";
    }

    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.font = "64px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(emoji, 32, 32);
      favicon.href = canvas.toDataURL();
    }

    document.head.appendChild(favicon);
    document.title = title;
  }, [location]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const showHeader = location.pathname !== "/";

  return (
    <>
      <FaviconManager />
      {showHeader && (
        <Header isCrypto={location.pathname === "/crypto"} currentPath={location.pathname} />
      )}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/crypto" element={<Crypto />} />
        <Route path="/new" element={<New />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}
