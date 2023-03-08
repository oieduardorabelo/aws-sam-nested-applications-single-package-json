import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Chance } from 'chance';

const chance = new Chance();

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const randomAddress = chance.address();
    const randomCompany = chance.company();
    try {
        return {
            statusCode: 200,
            body: JSON.stringify({
                randomAddress,
                randomCompany,
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
