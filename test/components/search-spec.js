import sinon from "sinon";
import {expect} from 'chai';
import * as Books from "../../src/components/books";
import * as GoogleBookService from "../../src/services/google-book-service";
import {onKeyPressSearchKeyword, searchBooksWithDefaultKeyword} from "../../src/components/search";
import {fetchBooksByKeyword} from "../../src/services/google-book-service";

describe('Search', () => {
    const BOOKS = {items: ['book with search keyword']};

    let stubFetchBooksByKeyword;
    let stubRenderBooks;

    beforeEach(() => {
        stubFetchBooksByKeyword = sinon.stub(GoogleBookService, 'fetchBooksByKeyword').resolves(BOOKS);
        stubRenderBooks = sinon.stub(Books, 'renderBooks');
    });

    afterEach(() => {
        GoogleBookService.fetchBooksByKeyword.restore();
        Books.renderBooks.restore();
    });

    describe('#onKeyPressSearchKeyword', () => {
        beforeEach(() => {
            document.body.innerHTML = '<input id="search-keyword" value="test keyword">';
        });

        describe('when enter key pressed', () => {
            const fakeEvent = {key: 'Enter'};

            it('should call fetchBooksByKeyword with "javascript" + input value', () => {
                onKeyPressSearchKeyword(fakeEvent);

                sinon.assert.calledWith(stubFetchBooksByKeyword, 'javascript test keyword');
            });

            it('should call renderBooks with returned data items', async () => {
                await onKeyPressSearchKeyword(fakeEvent);

                sinon.assert.calledWith(stubRenderBooks, BOOKS.items);
            });
        });

        describe('when other key pressed', () => {
            const fakeEvent = {key: 'Other Key'};

            it('should not call fetchBooksByKeyword', () => {
                onKeyPressSearchKeyword(fakeEvent);

                sinon.assert.notCalled(stubFetchBooksByKeyword);
            });

            it('should not call renderBooks', async  () => {
                await onKeyPressSearchKeyword(fakeEvent);

                sinon.assert.notCalled(stubRenderBooks);
            });
        });
    });

    describe('#searchBooksWithDefaultKeyword', () => {
        it('should call fetchBooksByKeyword with "javascript"', () => {
            searchBooksWithDefaultKeyword();

            sinon.assert.calledWith(stubFetchBooksByKeyword, 'javascript');
        });

        it('should call renderBooks with returned data items', async () => {
            await searchBooksWithDefaultKeyword();

            sinon.assert.calledWith(stubRenderBooks, BOOKS.items);
        });
    });
});