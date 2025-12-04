// src/App.tsx
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Weather from "./pages/Weather";
import Dogs from "./pages/Dogs";
import Crypto from "./pages/Crypto";
import New from "./pages/New";
import Main from "./pages/Main";
function AppContent() {
  const location = useLocation();
  const showHeader = location.pathname !== "/";

  return (
    <>
      {showHeader && <Header />}
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
