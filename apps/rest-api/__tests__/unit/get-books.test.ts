import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { handler } from '../../handlers/get-books';

describe('unit test for get-books handler', function () {
    it('verifies successful response', async () => {
        const event = {} as APIGatewayProxyEvent;
        const result: APIGatewayProxyResult = await handler(event);

        const body = JSON.parse(result.body);
        expect(result.statusCode).toEqual(200);
        expect(typeof body.randomAddress).toBe('string');
        expect(typeof body.randomCompany).toBe('string');
    });
});
