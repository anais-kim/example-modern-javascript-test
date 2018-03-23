import sinon from "sinon";
import {expect} from 'chai';
import {onClickAddBookmark, renderBooks, showBookElementById} from "../../src/components/books";
import * as Bookmarks from "../../src/components/bookmarks";
import {JSDOM} from "jsdom";

describe('Books', () => {
    describe('#onClickAddBookmark', () => {
        const book = {
            id: 'id',
            title: 'test title',
            authors: 'test author'
        };

        let fakeBookmarkIcon;
        let stubAddBookmark;

        beforeEach(() => {
            fakeBookmarkIcon = new JSDOM(`<div data-book-id="${book.id}" data-book-title="${book.title}" data-book-authors="${book.authors}"></div>`)
                .window.document.querySelector('div');

            document.body.innerHTML = '<li id="book-id">';
            stubAddBookmark = sinon.stub(Bookmarks, 'addBookmark');
        });

        afterEach(() => {
            stubAddBookmark.restore();
        });

        it('should change book element display style to be none', () => {
            onClickAddBookmark(fakeBookmarkIcon);

            expect(document.getElementById(`book-${book.id}`).style.display).to.equal('none');
        });

        it('should call addBookmark with book information', () => {
            onClickAddBookmark(fakeBookmarkIcon);

            expect(stubAddBookmark.calledWith(book)).to.be.true;
        });
    });

    describe('#showBookElementById', () => {
        beforeEach(() => {
            document.body.innerHTML = '<li id="book-id" style="display: none;">';
        });

        it('should change display style of book element if element is present', () => {
            showBookElementById('id');

            expect(document.getElementById('book-id').style.display).to.equal('flex');
        });
    });

    describe('#renderBooks', () => {
        const firstBook = {
            id: 'first',
            thumbnail: 'first thumbnail',
            title: 'first title',
            authors: 'first authors',
            description: 'first description'
        };

        const secondBook = {
            id: 'second',
            thumbnail: 'second thumbnail',
            title: 'second title',
            authors: 'second authors',
            description: undefined
        };

        const books = [
            {
                id: firstBook.id,
                volumeInfo: {
                    imageLinks: {
                        thumbnail: firstBook.thumbnail
                    },
                    title: firstBook.title,
                    authors: firstBook.authors,
                    description: firstBook.description
                }
            },
            {
                id: secondBook.id,
                volumeInfo: {
                    imageLinks: {
                        thumbnail: secondBook.thumbnail
                    },
                    title: secondBook.title,
                    authors: secondBook.authors,
                    description: secondBook.description
                }
            }
        ];

        beforeEach(() => {
            document.body.innerHTML = '<ul id="books"><li></li></ul>';
        });

        it('should create book element list with book list data', () => {
            renderBooks(books);

            const bookElements = document.querySelectorAll('#books > li');
            expect(bookElements.length).to.equal(2);

            expect(document.getElementById(`book-${firstBook.id}`)).to.be.not.null;
            expect(document.querySelector(`#book-${firstBook.id} > img`).getAttribute('src')).to.equal(firstBook.thumbnail);
            expect(document.querySelector(`#book-${firstBook.id} .book-title`).innerHTML).to.equal(firstBook.title);
            expect(document.querySelector(`#book-${firstBook.id} .book-authors`).innerHTML).to.equal(firstBook.authors);
            expect(document.querySelector(`#book-${firstBook.id} .book-description`).innerHTML).to.equal(firstBook.description);
            expect(document.querySelector(`#book-${firstBook.id} .bookmark-icons`).getAttribute('data-book-id')).to.equal(firstBook.id);
            expect(document.querySelector(`#book-${firstBook.id} .bookmark-icons`).getAttribute('data-book-title')).to.equal(firstBook.title);
            expect(document.querySelector(`#book-${firstBook.id} .bookmark-icons`).getAttribute('data-book-authors')).to.equal(firstBook.authors);

            expect(document.getElementById(`book-${secondBook.id}`)).to.be.not.null;
            expect(document.querySelector(`#book-${secondBook.id} > img`).getAttribute('src')).to.equal(secondBook.thumbnail);
            expect(document.querySelector(`#book-${secondBook.id} .book-title`).innerHTML).to.equal(secondBook.title);
            expect(document.querySelector(`#book-${secondBook.id} .book-authors`).innerHTML).to.equal(secondBook.authors);
            expect(document.querySelector(`#book-${secondBook.id} .book-description`).innerHTML).to.equal('');
            expect(document.querySelector(`#book-${secondBook.id} .bookmark-icons`).getAttribute('data-book-id')).to.equal(secondBook.id);
            expect(document.querySelector(`#book-${secondBook.id} .bookmark-icons`).getAttribute('data-book-title')).to.equal(secondBook.title);
            expect(document.querySelector(`#book-${secondBook.id} .bookmark-icons`).getAttribute('data-book-authors')).to.equal(secondBook.authors);
        });
    });
});