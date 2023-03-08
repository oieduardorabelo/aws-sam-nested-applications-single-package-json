import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { handler } from '../../handlers/get-categories';

describe('unit test for get-books handler', function () {
    it('verifies successful response', async () => {
        const event = {} as APIGatewayProxyEvent;
        const result: APIGatewayProxyResult = await handler(event);

        const body = JSON.parse(result.body);
        expect(result.statusCode).toEqual(200);
        expect(typeof body.randomName).toBe('string');
        expect(typeof body.randomEmail).toBe('string');
    });
});
