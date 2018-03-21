function fetchBooks() {
    fetch('https://www.googleapis.com/books/v1/volumes?q=javascript').then(res => {
        if (res.ok) {
            res.json().then((data) => {
                console.log(data.items);

                const books = document.getElementById('books');
                books.innerHTML = '';

                for (const book of data.items) {
                    const {imageLinks: {thumbnail}, title, authors, description} = book.volumeInfo;

                    books.innerHTML += `<li>
                            <img src="${thumbnail}"/>
                            <div class="book-detail">
                                <p class="book-title">${title}</p>
                                <p class="book-authors">${authors}</p>
                                <p class="book-description">${(description)? description : ''}</p>
                            </div>
                            <div class="bookmark-icons">
                                 <i class="far fa-star"></i>
                                 <!--<i class="fa fa-star"></i>-->
                            </div>
                            </li>`;
                }
            });
        } else {
            console.log('Cannot get book resources from Google Books.');
        }
    });
}

window.fetchBooks = fetchBooks;
