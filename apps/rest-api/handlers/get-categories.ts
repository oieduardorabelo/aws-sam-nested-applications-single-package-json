import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { faker } from '@faker-js/faker';

import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import invariant from 'tiny-invariant';

const ddb = new DocumentClient({
    apiVersion: '2012-08-10',
    region: process.env.AWS_REGION,
});

const tableName = process.env.TABLE_CATEGORIES_NAME;

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    invariant(tableName, 'tableName not specified in process.env.TABLE_CATEGORIES_NAME');

    const randomName = faker.name.fullName(); // Rowan Nikolaus
    const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
    try {
        const { Items } = await ddb
            .scan({
                TableName: tableName,
            })
            .promise();
        return {
            statusCode: 200,
            body: JSON.stringify({
                randomName,
                randomEmail,
                categories: Items,
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
