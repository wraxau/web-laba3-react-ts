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
      setImage(null);

      await new Promise(resolve => setTimeout(resolve, 500));

      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      const data: DogAPIResponse = await res.json();

      if (!data || data.status !== "success") {
        setError("Не удалось загрузить изображение. Попробуйте еще раз.");
        return;
      }

      setImage(data.message);
      setLoadedMessage(true);
    } catch (e) {
      setError("Ошибка загрузки. Пожалуйста, проверьте подключение к интернету.");
    } finally {
      setLoading(false);
    }
  }

  return (
      <div className="dogs-container">
        <h1>🐶 Случайная собака</h1>
        <p className="subtitle">Нажмите на кнопку ниже, чтобы увидеть милого пса!</p>

        <div className={`dogs-result ${image || loading || error ? "show" : ""}`}>
          {loading && (
              <div className="dogs-loading">
                <div className="loading-spinner"></div>
                <p>Ищем самого симпатичного пса...</p>
              </div>
          )}

          {error && (
              <div className="dogs-error">
                <p>{error}</p>
              </div>
          )}

          {image && !loading && (
              <>
                <div className="dog-image-container">
                  <img
                      src={image}
                      alt="Случайная собака"
                      loading="lazy"
                      onLoad={() => console.log("Изображение загружено")}
                  />
                </div>
                {loadedMessage && (
                    <div className="dogs-success">
                      Случайная собака загружена!
                    </div>
                )}
              </>
          )}

          {!image && !loading && !error && (
              <div className="dogs-empty">
                <div className="empty-icon">🐕</div>
                <p>Здесь появится случайная собака</p>
                <p className="small-text">Нажмите на кнопку, чтобы начать</p>
              </div>
          )}
        </div>

        <button
            className={`dogs-btn ${loading ? "loading" : ""}`}
            onClick={loadDog}
            disabled={loading}
        >
          {loading ? "Загрузка..." : "🎲 Показать случайную собаку"}
        </button>

        <div className="dogs-info">
          <p className="info-text">
            ⓘ Все изображения предоставлены{" "}
            <a
                href="https://dog.ceo/dog-api/"
                target="_blank"
                rel="noopener noreferrer"
                className="link"
            >
              Dog API
            </a>
          </p>
        </div>
      </div>
  );
}