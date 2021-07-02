import URL_API_KEY from "../api_key.js";

const body          = document.body;
const overlay       = document.querySelector('.overlay');
const input         = document.querySelector('.bookmark-input');
const bookmarksList = document.querySelector('.bookmarks-list');
const bookmarkForm  = document.querySelector('.bookmark-form');
const bookmarks     = JSON.parse(localStorage.getItem('bookmarks')) || [];

const apiKey = URL_API_KEY;
const apiUrl = 'https://opengraph.io/api/1.1/site/';


const showFloater = () => {
  body.classList.add('show-floater');
}

const closeFloater = () => {
  body.classList.remove('show-floater');
}

const createBookmark = (event) => {
  const urlEncoded = encodeURIComponent(input.value)
  event.preventDefault();
  if (!input.value) {
    alert('please enter a valid link');
    return;
  }
  fetch(apiUrl + urlEncoded + '?app_id=' + apiKey)
  .then(response => response.json())
  .then(data => {
    const bookmark = {
      title: data.hybridGraph.title,
      image: data.hybridGraph.image,
      link: data.hybridGraph.url
    };
    bookmarks.push(bookmark);
    closeFloater();
    bookmarkForm.reset();
    fillBookmarksList(bookmarks);
    storeBookmarks(bookmarks);
  })
  .catch(error => {
    alert('please enter a valid link');
  })
  document.activeElement.blur();
}

const fillBookmarksList = (bookmarks = []) => {
  bookmarksList.innerHTML = bookmarks.map((bookmark, i) => {
    return `
    <a href="${bookmark.link}" class="bookmark" data-id="${i} target="_blank">
      <div class="img" style="background-image: url('${bookmark.image}')"></div>
      <div class="title">${bookmark.title}</div>
    </a>
    <i class="fas fa-trash-alt delete-btn"></i>
    `;
  }).join('');
};

const removeBookmark = (event) => {
  if (!event.target.matches('.fa-trash-alt')) return;
  // find the index of the bookmark
  const index = event.target.parentNode.dataset.id;
  // remove from the bookmarks
  bookmarks.splice(index, 1);
  // fill the list
  fillBookmarksList(bookmarks);
  // store back to localStorage
  storeBookmarks(bookmarks);
}

const storeBookmarks = (bookmarks = []) => {
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

bookmarkForm.addEventListener('submit', createBookmark);
input.addEventListener('focus', showFloater);
overlay.addEventListener('click', closeFloater);
bookmarksList.addEventListener('click', removeBookmark);

fillBookmarksList(bookmarks);

export { showFloater, closeFloater, createBookmark }