import '../styles/main.css';
import '../styles/dogs.css';

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('getDogBtn');
    const result = document.getElementById('dogResult');
  
    btn.addEventListener('click', async () => {
      result.innerHTML = '<p>Загрузка...</p>';
      result.classList.add('show');
  
      try {
        const res = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await res.json();
  
        if (!data || data.status !== 'success') {
          result.innerHTML = '<p>Не удалось загрузить изображение.</p>';
          return;
        }
  
        const imageUrl = data.message;
        result.innerHTML = `
          <img src="${imageUrl}" alt="Собака" style="max-width:100%; border-radius:8px; margin-bottom:16px;">
          <p>Случайная собака загружена!</p>
        `;
      } catch (error) {
        console.error('Ошибка:', error);
        result.innerHTML = '<p>Ошибка загрузки. Попробуйте позже.</p>';
      }
    });
  });
  