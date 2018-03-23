import {fetchBooksByKeyword} from "../services/google-book-service";
import {renderBooks} from "./books";

export function onKeyPressSearchKeyword(event) {
    if (event.key === 'Enter') {
        const keyword = document.getElementById('search-keyword').value;
        fetchBooksByKeyword('javascript' + ' ' + keyword).then(data => renderBooks(data.items));
    }
}

export function searchBooksWithDefaultKeyword() {
    fetchBooksByKeyword('javascript').then(data => renderBooks(data.items));
}