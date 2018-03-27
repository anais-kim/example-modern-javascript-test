import sinon from "sinon";
import {expect} from 'chai';
import {handleResponse} from "../../src/services/response-handler";

describe('ResponseHandler', () => {
    describe('#handleResponse', () => {
        let stubLog;

        beforeEach(() => {
            stubLog = sinon.stub(console, 'log');
        });

        afterEach(() => {
            console.log.restore();
        });

        it('should return json response body when status is okay', () => {
            const response = {
                ok: true,
                json: () => {return {key: 'value'}}
            };
            const result = handleResponse(response);

            expect(result).to.deep.equal({key: 'value'});
        });

        it('should log response when status is not okay', () => {
            const response = {ok: false};
            handleResponse(response);

            sinon.assert.calledWith(stubLog, response);
        });
    })
});