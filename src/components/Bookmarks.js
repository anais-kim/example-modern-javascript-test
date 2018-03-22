import {showBookElementById} from "./Books";

export function onClickRemoveBookmark(e) {
    const id = e.getAttribute('data-book-id');
    removeBookmark(id);
    showBookElementById(id);
}

export function addBookmark(book) {
    render(book);
}
function removeBookmark(id) {
    document.getElementById('bookmark-' + id).remove();
}

function render(book) {
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