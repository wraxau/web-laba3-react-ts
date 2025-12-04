import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Weather from "./pages/Weather";
import Dogs from "./pages/Dogs";
import Crypto from "./pages/Crypto";
import New from "./pages/New";
import Main from "./pages/Main";

export default function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/crypto" element={<Crypto />} />
        <Route path="/new" element={<New />} />
      </Routes>
    </HashRouter>
  );
}
