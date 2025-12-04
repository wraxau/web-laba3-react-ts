import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";
import "../styles/news.css";

interface Article { id: number; title: string; authors: { name: string }[]; url: string; image_url: string; news_site: string; summary: string; published_at: string; updated_at: string; }

export default function News() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function loadNews(e: React.FormEvent) {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setError("Пожалуйста, введите название космического объекта");
    return;
  }

    setLoading(true); setError(null); setArticles([]);
    try {
      const response = await fetch(`https://api.spaceflightnewsapi.net/v4/articles/?format=json&limit=10&search=${query}`);
      if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);
      const json = await response.json();
      if (!json.results || json.results.length === 0) setError("Не удалось получить новости об этом объекте. Попробуйте ввести другое название.");
      else setArticles(json.results);
    } catch { setError("Ошибка загрузки новостей."); }
    finally { setLoading(false); }
  }

  return (
    <div>
      <header>
        <h1>Лучшие новости про космические объекты собраны здесь!</h1>
        <p className="subtitle">
          Напишите название любого космического объекта на английском языке и
          получите новости о нём!
        </p>
      </header>
      <form onSubmit={loadNews} className = "new-form">
        <input className="new-input" type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Например: Mars, Sun, Pluto" />
        <button type="submit">Поиск</button>
      </form>

      <div className="homeButton" id="to-home-button"><Link to="/" >🏠 На главную</Link></div>

      {loading && <p>Поиск новостей...</p>}
      {error && <p>{error}</p>}

      {articles.length > 0 && (
      <>
        <div className="new-header">
          <h2>Вот лучшие новости о вашем космическом объекте: {query}</h2>
        </div>
        {articles.map(a => (
          <div key={a.id} className="news-card">
            <div className="name-story">
              <span>{a.title}</span>
            </div>
            <img src={a.image_url} alt="space" className="image-object" />
            <div className = "short-story">
              <label>Кратко: </label>
              <span>${a.summary}</span>
            </div>
            <details className="in-detail">
              <summary>Подробнее про эту статью</summary>
              <ul className="meta-data">
                <li><strong>Авторы:</strong> {a.authors?.[0]?.name || "Автор неизвестен"}</li>
                <li><strong>Ссылка:</strong> <a href={a.url} target="_blank" rel="noopener noreferrer">{a.url}</a></li>
                <li><strong>Источник:</strong> {a.news_site}</li>
                <li><strong>Опубликовано:</strong> {new Date(a.published_at).toLocaleString("ru-RU")}</li>
                <li><strong>Обновлено:</strong> {new Date(a.updated_at).toLocaleString("ru-RU")}</li>
              </ul>
            </details>
          </div>
        ))}
      </>
    )}
      {articles.length > 0 && <div className="homeButton" id="to-home-button"><Link to="/" >🏠 На главную</Link></div>}
    </div>
  );
}
