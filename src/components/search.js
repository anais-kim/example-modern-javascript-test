import {fetchBooksByKeyword} from "../services/google-book-service";
import {renderBooks} from "./books";

export function onKeyPressSearchKeyword(event) {
    if (event.key === 'Enter') {
        const keyword = document.getElementById('search-keyword').value;
        searchBooks(keyword);
    }
}

export function searchBooks(keyword) {
    const searchKeyword = 'javascript ' + ((keyword)? keyword : '') ;
    fetchBooksByKeyword(searchKeyword).then(data => renderBooks(data.items));
}