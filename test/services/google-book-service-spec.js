import fetchMock from 'fetch-mock';
import sinon from "sinon";
import {expect} from 'chai';
import * as GoogleBookService from '../../src/services/google-book-service'
import * as ResponseHandler from '../../src/services/response-handler';

describe('GoogleBookService', () => {
    describe('#fetchBooksBykeyword', () => {
        beforeEach(() => {
            fetchMock.get('*', {items: [{title: 'book1'}, {title: 'book2'}]});
            sinon.spy(ResponseHandler, 'handleResponse');
        });

        afterEach(() => {
            fetchMock.restore();
            ResponseHandler.handleResponse.restore();
        });

        it('should fetch volume api with query parameter', async () => {
            await GoogleBookService.fetchBooksByKeyword('keyword');

            const url = fetchMock.calls()[0][0];
            expect(url).to.equal('https://www.googleapis.com/books/v1/volumes?q=keyword');
        });

        it('should call handleResponse with fetched response', async () => {
            await GoogleBookService.fetchBooksByKeyword('keyword');

            sinon.assert.calledWith(ResponseHandler.handleResponse, sinon.match({
                "ok": true,
                "body": sinon.match.string
            }));
        });

        it('should return result', async () => {
            const result = await GoogleBookService.fetchBooksByKeyword('keyword');

            expect(result).to.deep.equal({items: [{title: 'book1'}, {title: 'book2'}]});
        });
    })
})
