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
    if (!query.trim()) return;

    setLoading(true); setError(null); setArticles([]);
    try {
      const response = await fetch(`https://api.spaceflightnewsapi.net/v4/articles/?format=json&limit=10&search=${query}`);
      if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);
      const json = await response.json();
      if (!json.results || json.results.length === 0) setError("Не удалось получить новости");
      else setArticles(json.results);
    } catch { setError("Ошибка загрузки новостей."); }
    finally { setLoading(false); }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Поиск новостей о космосе</h1>
      <form onSubmit={loadNews} style={{ marginBottom: 20 }}>
        <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Введите объект" style={{ padding: 8, width: 300, marginRight: 10 }} />
        <button type="submit">Поиск</button>
      </form>

      {loading && <p>Поиск новостей...</p>}
      {error && <p>{error}</p>}

      {articles.map(a => (
        <div key={a.id} style={{ border: "1px solid #ccc", padding: 16, borderRadius: 8, marginBottom: 20, maxWidth: 700 }}>
          <h3>{a.title}</h3>
          <img src={a.image_url} alt="space" style={{ maxWidth: "100%", borderRadius: 8, marginBottom: 12 }} />
          <p><strong>Кратко:</strong> {a.summary}</p>
          <details>
            <summary>Подробнее...</summary>
            <ul>
              <li><strong>Авторы:</strong> {a.authors?.[0]?.name || "Автор неизвестен"}</li>
              <li><strong>Ссылка:</strong> <a href={a.url} target="_blank" rel="noopener noreferrer">{a.url}</a></li>
              <li><strong>Источник:</strong> {a.news_site}</li>
              <li><strong>Опубликовано:</strong> {new Date(a.published_at).toLocaleString("ru-RU")}</li>
              <li><strong>Обновлено:</strong> {new Date(a.updated_at).toLocaleString("ru-RU")}</li>
            </ul>
          </details>
        </div>
      ))}

      {articles.length > 0 && <div style={{ marginTop: 20 }}><Link to="/" style={{ fontSize: 18 }}>🏠 На главную</Link></div>}
    </div>
  );
}
