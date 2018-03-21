export class Bookmarks {

    constructor() {}

    add(book) {
        const {id, title, authors} = book;
        const bookmarksElement = document.getElementById('bookmarks');

        bookmarksElement.innerHTML += `
            <li id="bookmark-${id}">
                 <span class="bookmark-title">${title}</span>
                 <span class="bookmark-authors">${authors}</span>
                <div class="bookmark-icons" data-bookmark-id="${id}" onclick="deleteBookmark(this)">
                     <i class="fa fa-star"></i>
                </div>
            </li>`;
    }

    delete(id) {
        console.log(id);
    }

}