import '../styles/main.css';
import '../styles/news.css';

document.getElementById("newForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const news = document.getElementById('newInput').value.trim();
    if (!news) return;
  
    await fetchSearchObject(news);
});

async function fetchSearchObject(space_object){
    const result = document.getElementById("newResult");
    result.innerHTML = '<p>Поиск новостей...</p>';
    result.classList.add('show');

    try {
        const response = await fetch(`https://api.spaceflightnewsapi.net/v4/articles/?format=json&limit=10&search=${space_object}`);
        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }
        const response_json = await response.json();
        if (!response_json.results || response_json.results.length === 0) {
            result.innerHTML = "<p>Не удалось получить новости об этом объекте. Попробуйте ввести другое название.</p>"
            return
        }
        function formatDate(dateString) {
            return new Date(dateString).toLocaleString('ru-RU');
        }
        let allCardsHtml = ``;
        allCardsHtml += `
                <div class = "new-header">
                    <h2>Вот лучшие новости о вашем космическом объекте: ${space_object}</h2>
                </div>`
        for (const card of response_json.results) {
            const { title, authors, url, image_url, news_site, summary, published_at, updated_at} = card;
            const published_formated = formatDate(published_at);
            const updated_formated = formatDate(updated_at);
            const authorsName = authors?.[0]?.name || "Автор неизвестен";

            allCardsHtml += `
                <div class = "news-card">
                    <div class = "name-story">
                        <span>${title}</span>
                    </div>
                    <img src="${image_url}" alt="Космический объект" class="image-object">
                    <div class = "short-story">
                        <label>Кратко: </label>
                        <span>${summary}</span>
                    </div>
                    <details class = "in-detail">
                        <summary>Подробнее про эту статью</summary>
                        <ul class = "meta-data">
                            <li><strong>Авторы статьи: </strong>${authorsName}</li>
                            <li><strong>Ссылка на статью: </strong> <a href = "${url}">${url}</a></li>
                            <li><strong>Источник статьи: </strong>${news_site}</li>
                            <li><strong>Статья опубликована: </strong>${published_formated}</li>
                            <li><strong>Статья обновлена: </strong>${updated_formated}</li>
                        </ul>
                    </details>
                </div>
            `
        }
        allCardsHtml += `
            <div class="to-home">
                <a href="index.html" class="homeButton" id="to-home-button">🏠 На главную</a>
            </div>
        `
        result.innerHTML = allCardsHtml;
        const homeButton = document.getElementById('to-home-button');
        if (homeButton) {
        homeButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'https://wraxau.github.io/web-laba2/index.html';
        });
    }
    }
    catch (error){
        console.error('Ошибка:', error);
        result.innerHTML = '<p>Ошибка загрузки новостей</p>';
    }
}


