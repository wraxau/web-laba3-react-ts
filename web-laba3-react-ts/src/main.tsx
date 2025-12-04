import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import './styles/style.css'; 
import "./styles/weather.css";
import "./styles/dogs.css";
import "./styles/crypto.css";
import "./styles/news.css";
import "./styles/main.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
