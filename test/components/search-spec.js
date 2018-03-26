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
        document.body.innerHTML = '<input id="search-keyword" value="test keyword">';

        stubFetchBooksByKeyword = sinon.stub(GoogleBookService, 'fetchBooksByKeyword').resolves(BOOKS);
        stubRenderBooks = sinon.stub(Books, 'renderBooks');
    });

    afterEach(() => {
        stubFetchBooksByKeyword.restore();
        stubRenderBooks.restore();
    });

    describe('#onKeyPressSearchKeyword', () => {
        describe('when enter key pressed', () => {
            const fakeEvent = {key: 'Enter'};

            it('should call fetchBooksByKeyword with "javascript" and input value', () => {
                onKeyPressSearchKeyword(fakeEvent);

                expect(stubFetchBooksByKeyword.calledWith('javascript test keyword')).to.be.true;
            });

            it('should call renderBooks with returned data items', async () => {
                await onKeyPressSearchKeyword(fakeEvent);

                expect(stubRenderBooks.calledWith(BOOKS.items)).to.be.true;
            });
        });

        describe('when other key pressed', () => {
            const fakeEvent = {key: 'Other Key'};

            it('should not call fetchBooksByKeyword', () => {
                onKeyPressSearchKeyword(fakeEvent);

                expect(stubFetchBooksByKeyword.called).to.be.false;
            });

            it('should not call renderBooks', async  () => {
                await onKeyPressSearchKeyword(fakeEvent);

                expect(stubRenderBooks.called).to.be.false;
            });
        });
    });

    describe('#searchBooksWithDefaultKeyword', () => {
        it('should call fetchBooksByKeyword with "javascript"', () => {
            searchBooksWithDefaultKeyword();

            expect(stubFetchBooksByKeyword.calledWith('javascript')).to.be.true;
        });

        it('should call renderBooks with returned data items', async () => {
            await searchBooksWithDefaultKeyword();

            expect(stubRenderBooks.calledWith(BOOKS.items)).to.be.true;
        });
    });
});