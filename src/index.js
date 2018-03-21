import {Books} from "./components/Books";
import {Bookmarks} from "./components/Bookmarks";

function fetchBooks(keyword) {
    new Books(keyword);
}

function searchBooks(event) {
    if(event.key === 'Enter') {
        const keyword = document.getElementById('search-keyword').value;
        fetchBooks(keyword);
    }
}

function bookmark(e) {
    const id = e.getAttribute('data-book-id');
    const title = e.getAttribute('data-book-title');
    const authors = e.getAttribute('data-book-authors');
    document.getElementById('book-' + id).style.display = 'none';

    new Bookmarks().add({id, title, authors});
}

function deleteBookmark(e) {
    const id = e.getAttribute('data-bookmark-id');
    document.getElementById('bookmark-' + id).remove();

    const books = document.getElementsByClassName('book');
    for (const book of books ) {
        if (book.id === ('book-' + id)) {
            document.getElementById('book-' + id).style.display = 'flex';
        }
    }
}

window.fetchBooks = fetchBooks;
window.searchBooks = searchBooks;
window.bookmark = bookmark;
window.deleteBookmark = deleteBookmark;
