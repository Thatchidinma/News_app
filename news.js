const newsList = document.querySelector('.news-list');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

let currentPage = 1;

function fetchNews(page = currentPage) {
  const url = `https://61924d4daeab5c0017105f1a.mockapi.io/skaet/v1/news?page=${page}&limit=10`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      updateNewsList(data);
      updatePaginationButtons(data.length);
    })
    .catch(error => console.error(error));
}

function updateNewsList(news) {
  newsList.innerHTML = ''; // Clear previous content

  news.forEach(newsItem => {
    const newsElement = document.createElement('div');
    newsElement.classList.add('news-item');

    // Add news title, author, etc. (update based on your needs)
    newsElement.innerHTML = `
      <h3>${newsItem.title}</h3>
      <p>By: ${newsItem.author}</p>
      <a href="single-news.html?id=${newsItem.id}">Read More</a>
    `;

    newsList.appendChild(newsElement);
  });
}

function updatePaginationButtons(newsCount) {
  if (currentPage === 1) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  if (newsCount === 0) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }
}

prevBtn.addEventListener('click', () => {
  currentPage--;
  fetchNews(currentPage);
});

nextBtn.addEventListener('click', () => {
  currentPage++;
  fetchNews(currentPage);
});

fetchNews(); // Fetch initial news on page load