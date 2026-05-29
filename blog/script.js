// Made by Adrian Hernandez
const articles = [
  {
    id: 1,
    title: 'Septimus Heap Book One: Magyk',
    date: 'July 5, 2022',
    description: 'If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.',
    imgSrc: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg',
    imgAlt: 'Book cover for Septimus Heap 1',
    ages: '10-14',
    genre: 'Fantasy',
    stars: '⭐⭐⭐⭐',
    author: 'Angie Sage'
  },
  {
    id: 2,
    title: 'Magnus Chase Book One: Sword of Summer',
    date: 'December 12, 2021',
    description: 'The anticipated new novel by Rick Riordan. After Greek mythology (Percy Jackson), Greek/Roman (Heroes of Olympus), and Egyptian (Kane Chronicles), Rick decides to try his hand with Norse Mythology, and the end result is good.',
    imgSrc: 'https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300',
    imgAlt: 'Book cover for Magnus Chase 1',
    ages: '12-16',
    genre: 'Fantasy',
    stars: '⭐⭐⭐⭐',
    author: 'Rick Riordan'
  },
  {
    id: 3,
    title: 'Belgariad Book One: Pawn of Prophecy',
    date: 'Feb 12, 2022',
    description: 'A fierce dispute among the Gods and the theft of a powerful Orb leaves the World divided into five kingdoms. Young Garion, with his "Aunt Pol" and an elderly man calling himself Wolf --a father and daughter granted near-immortality by one of the Gods -- set out on a complex mission.',
    imgSrc: 'https://images-na.ssl-images-amazon.com/images/I/41ZxXA+nInL.jpg',
    imgAlt: 'Book cover for Pawn of Prophecy',
    ages: '12-16',
    genre: 'Fantasy',
    stars: '⭐⭐⭐⭐⭐',
    author: 'David Eddings'
  }
];

const bookList = document.getElementById('book-list');

function renderBooks() {
  let html = '';
  articles.forEach(book => {
    html += `
      <article class="book-card">
        <div class="book-meta">
          <span class="book-date">${book.date}</span>
          <span class="book-age">${book.ages}</span>
          <span class="book-genre">${book.genre}</span>
          <div class="book-rating" aria-label="Rating ${book.stars.length} out of 5 stars">
            ${book.stars.split('').map(star => `<span class="star">${star}</span>`).join('')}
          </div>
        </div>
        <div class="book-content">
          <h2 class="book-title">${book.title}</h2>
          <img class="book-cover" src="${book.imgSrc}" alt="${book.imgAlt}">
          <p class="book-description">${book.description}</p>
          <p class="book-author">${book.author}</p>
        </div>
      </article>
    `;
  });
  bookList.innerHTML = html;
}

renderBooks();