import {fetchBooksByKeyword} from "../services/GoogleBookService";
import {render} from "./Books";

export function onKeyPressSearchKeyword(event) {
    if (event.key === 'Enter') {
        const keyword = document.getElementById('search-keyword').value;
        searchBooks(keyword);
    }
}

export function searchBooks(keyword) {
    const searchKeyword = 'javascript ' + ((keyword)? keyword : '') ;
    fetchBooksByKeyword(searchKeyword).then(data => render(data.items));
}