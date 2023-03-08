import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { faker } from '@faker-js/faker';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const randomName = faker.name.fullName(); // Rowan Nikolaus
    const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
    try {
        return {
            statusCode: 200,
            body: JSON.stringify({
                randomName,
                randomEmail,
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};
