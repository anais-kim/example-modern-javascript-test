import {fetchBooksByKeyword} from "../services/GoogleBookService";

export class Books {

    constructor(keyword) {
        fetchBooksByKeyword(keyword).then(data => this.render(data.items));
    }

    render(books) {
        const booksElement = document.getElementById('books');
        booksElement.innerHTML = '';

        for (const book of books) {
            const {id, volumeInfo: {imageLinks: {thumbnail}, title, authors, description}} = book;

            booksElement.innerHTML += `
                <li id="book-${id}" class="book">
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
                            onclick="bookmark(this)">
                         <i class="far fa-star"></i>
                    </div>
                </li>`;
        }
    }

}