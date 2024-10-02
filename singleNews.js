const newsTitle = document.getElementById('news-title');
const newsAuthor = document.getElementById('news-author');
const newsImage = document.getElementById('news-image');
const imageSlider = document.getElementById('image-slider');
const newsContent = document.getElementById('news-content');
const commentList = document.getElementById('comment-list');
const commentForm = document.getElementById('comment-form');
const commentNameInput = document.getElementById('comment-name');
const commentTextInput = document.getElementById('comment-text');
const container = document.getElementsByClassName('container')

let currentNewsId = null;
let currentImageIndex = 0;

function fetchNewsDetails(newsId) {
  const url = `https://61924d4daeab5c0017105f1a.mockapi.io/skaet/v1/news/${newsId}`;
  document.getElementById('loading-indicator').style.display = 'block';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayNewsDetails(data);
      fetchImages(newsId);
      document.getElementById('loading-indicator').style.display = 'none';
    })
    .catch(error => console.error(error),
    // displayErrorMessage('An error occurred while fetching news. Please try again later.')
  );

}

// function displayErrorMessage(message) {
//   const errorMessage = document.createElement('p');
//   errorMessage.textContent = message;
//   errorMessage.classList.add('error-message');

//   newsContent.appendChild(errorMessage); // Append the error message to the news content section
// }

function displayNewsDetails(news) {
  newsTitle.textContent = news.title;
  newsAuthor.textContent = `By: ${news.author}`;
  newsContent.textContent = news.content;
}

function fetchImages(newsId) {
  const url = `https://61924d4daeab5c0017105f1a.mockapi.io/skaet/v1/news/${newsId}/images`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayImages(data);
    })
    .catch(error => console.error(error));
}

function displayImages(images) {
  imageSlider.innerHTML = ''; // Clear previous images

  if (images.length > 0) {
    images.forEach(image => {
      const imageElement = document.createElement('img');
      imageElement.src = image.image;
      imageElement.alt = newsTitle.textContent;
      imageSlider.appendChild(imageElement);
    });

   
  } else {
    newsImage.src = './images/news.jpg';
  }
}

function fetchComments(newsId) {
  const url = `https://61924d4daeab5c0017105f1a.mockapi.io/skaet/v1/news/${newsId}/comments`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayComments(data);
    })
    .catch(error => console.error(error));
}

function displayComments(comments) {
  commentList.innerHTML = ''; // Clear previous comments

  comments.forEach(comment => {
    const commentElement = document.createElement('li');
    commentElement.textContent = `${comment.name}: ${comment.comment}`;
    commentList.appendChild(commentElement);
  });
}

commentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const commentData = {
    name: commentNameInput.value,
    comment: commentTextInput.value
  };

  const url = `https://61924d4daeab5c0017105f1a.mockapi.io/skaet/v1/news/${currentNewsId}/comments`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentData)
  })
    .then(response => response.json())
    .then(data => {
      fetchComments(currentNewsId);
      commentNameInput.value = '';
      commentTextInput.value = '';
    })
    .catch(error => console.error(error));
});

// Get news ID from URL and fetch details
const urlParams = new URLSearchParams(window.location.search);
const newsId = urlParams.get('id');

if (newsId) {
  currentNewsId = newsId;
  fetchNewsDetails(newsId);
  fetchComments(newsId);
}