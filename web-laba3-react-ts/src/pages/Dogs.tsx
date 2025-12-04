import { useState } from "react";
import "../styles/style.css";
import "../styles/dogs.css";

interface DogAPIResponse {
  message: string;
  status: "success" | "error";
}

export default function Dogs() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadedMessage, setLoadedMessage] = useState(false);

  async function loadDog() {
    try {
      setLoading(true);
      setError(null);
      setLoadedMessage(false);

      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      const data: DogAPIResponse = await res.json();

      if (!data || data.status !== "success") {
        setError("Не удалось загрузить изображение.");
        return;
      }

      setImage(data.message);
      setLoadedMessage(true);
    } catch (e) {
      setError("Ошибка загрузки. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dogs-container">
      <h1>Случайная собака</h1>

      <div id="dogResult" className={`result-block ${image || loading ? "show" : ""}`}>
        {loading && <p>Загрузка...</p>}

        {error && <p className="error">{error}</p>}

        {image && !loading && (
          <>
            <img
              src={image}
              alt="Собака"
              style={{ maxWidth: "100%", borderRadius: 8, marginBottom: 16 }}
            />
            {loadedMessage && <p>Случайная собака загружена!</p>}
          </>
        )}
      </div>

      <button id="getDogBtn" className="btn" onClick={loadDog}>
        Показать собаку
      </button>
    </div>
  );
}
