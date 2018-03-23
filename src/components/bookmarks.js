import {showBookElementById} from "./books";

export function onClickRemoveBookmark(element) {
    const id = element.getAttribute('data-book-id');
    document.getElementById('bookmark-' + id).remove();
    showBookElementById(id);
}

export function addBookmark(book) {
    const bookmarksElement = document.getElementById('bookmarks');

    bookmarksElement.innerHTML += `
            <li id="bookmark-${book.id}">
                 <span class="bookmark-title">${book.title}</span>
                 <span class="bookmark-authors">${book.authors}</span>
                <div class="bookmark-icons" data-book-id="${book.id}" onclick="onClickRemoveBookmark(this)">
                     <i class="fa fa-star"></i>
                </div>
            </li>`;
}