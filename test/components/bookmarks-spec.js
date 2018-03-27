import sinon from "sinon";
import {expect} from 'chai';
import {addBookmark, onClickRemoveBookmark} from "../../src/components/bookmarks";
import * as Books from "../../src/components/books";

describe('Bookmarks', () => {
    describe('#onClickRemoveBookmark', () => {
        const fakeElement = {
            getAttribute: () => {
                return 'fakeBookId'
            }
        };

        let spyShowBookElementById;

        beforeEach(() => {
            document.body.innerHTML = '<li id="bookmark-fakeBookId">';
            spyShowBookElementById = sinon.spy(Books, 'showBookElementById');
        });

        afterEach(() => {
            Books.showBookElementById.restore();
        });

        it('should remove bookmark element with book id', () => {
            onClickRemoveBookmark(fakeElement);

            const bookmarkElement = document.getElementById('bookmark-fakeBookId');
            expect(bookmarkElement).to.be.null;
        });

        it('should call showBookElementById with book id', () => {
            onClickRemoveBookmark(fakeElement);

            sinon.assert.calledWith(spyShowBookElementById, 'fakeBookId');
        });
    });

    describe('#addBookmark', () => {
        const book = {
            id: 'id',
            title: 'test title',
            authors: 'test author'
        };

        beforeEach(() => {
            document.body.innerHTML = '<ul id="bookmarks"></ul>';
        });

        it('should create bookmark element with book information', () => {
            addBookmark(book);

            const bookmarkElement = document.getElementById(`bookmark-${book.id}`);
            expect(bookmarkElement).to.be.not.null;

            expect(document.querySelector(`#bookmark-${book.id} > .bookmark-title`).innerHTML).to.equal(book.title);
            expect(document.querySelector(`#bookmark-${book.id} > .bookmark-authors`).innerHTML).to.equal(book.authors);
            expect(document.querySelector(`#bookmark-${book.id} > .bookmark-icons`).getAttribute('data-book-id')).to.equal(book.id);
        });
    });
});