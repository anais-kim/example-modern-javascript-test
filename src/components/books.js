import {addBookmark} from "./bookmarks";

export function onClickAddBookmark(e) {
    const id = e.getAttribute('data-book-id');
    const title = e.getAttribute('data-book-title');
    const authors = e.getAttribute('data-book-authors');
    document.getElementById('book-' + id).style.display = 'none';

    addBookmark({id, title, authors});
}

export function showBookElementById(id) {
    const book = document.getElementById('book-' + id);
    if (book) book.style.display = 'flex';
}

export function renderBooks(books) {
    const booksElement = document.getElementById('books');
    booksElement.innerHTML = '';

    for (const book of books) {
        const {id, volumeInfo: {imageLinks: {thumbnail}, title, authors, description}} = book;

        booksElement.innerHTML += `
                <li id="book-${id}">
                    <img src="${thumbnail}"/>
                    <div class="book-detail">
                        <p class="book-title">${title}</p>
                        <p class="book-authors">${authors}</p>
                        <p class="book-description">${(description) ? description : ''}</p>
                    </div>
                    <div class="bookmark-icons" 
                            data-book-id="${id}" 
                            data-book-title="${title}" 
                            data-book-authors="${authors}" 
                            onclick="onClickAddBookmark(this)">
                         <i class="far fa-star"></i>
                    </div>
                </li>`;
    }
}