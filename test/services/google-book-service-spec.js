import fetchMock from 'fetch-mock';
import sinon from "sinon";
import {expect} from 'chai';
import * as GoogleBookService from '../../src/services/google-book-service'

describe('GoogleBookService', () => {
    describe('#fetchBooksBykeyword', () => {
        beforeEach(() => {
            fetchMock.get('end:javascript', {items: [{title: 'javascript book1'}, {title: 'javascript book2'}]});
            fetchMock.get('*', 400);

            sinon.stub(console, 'log');
        });

        afterEach(() => {
            fetchMock.restore();

            console.log.restore();
        });

        it('should fetch GET /volumes api with query parameter keyword', async () => {
            await GoogleBookService.fetchBooksByKeyword('javascript');

            const url = fetchMock.lastCall()[0];
            expect(url).to.equal('https://www.googleapis.com/books/v1/volumes?q=javascript');
        });

        it('should return json response body when status is okay', async () => {
            const result = await GoogleBookService.fetchBooksByKeyword('javascript');

            expect(result).to.deep.equal({items: [{title: 'javascript book1'}, {title: 'javascript book2'}]});
        });

        it('should call console.log with response when status is not okay', async () => {
            await GoogleBookService.fetchBooksByKeyword('failure keyword');

            sinon.assert.calledWith(console.log, sinon.match.has('status', 400));
        });
    })
})
