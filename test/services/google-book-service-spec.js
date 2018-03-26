import fetchMock from 'fetch-mock';
import sinon from "sinon";
import {expect} from 'chai';
import * as GoogleBookService from '../../src/services/google-book-service'
import * as ResponseHandler from '../../src/services/response-handler';

require('babel-polyfill');

describe('GoogleBookService', () => {
    describe('#fetchBooksBykeyword', () => {
        let result;
        const BOOKS = {items: ['book with keyword']};

        beforeEach(async () => {
            fetchMock.get('*', BOOKS);

            sinon.stub(ResponseHandler, 'handleResponse').resolves(BOOKS);

            result = await GoogleBookService.fetchBooksByKeyword('keyword');
        });

        afterEach(() => {
            fetchMock.restore();
            ResponseHandler.handleResponse.restore();
        });

        it('should fetchs volume api with query parameters keyword', () => {
            const url = fetchMock.calls()[0][0];
            expect(url).to.equal('https://www.googleapis.com/books/v1/volumes?q=keyword');
        });

        it('should call handleResponse with fetched response', () => {
            expect(ResponseHandler.handleResponse.calledWith(sinon.match.object)).to.be.true;
        });

        it('should result returned', () => {
            expect(result).to.deep.equal(BOOKS);
        });
    })
})
