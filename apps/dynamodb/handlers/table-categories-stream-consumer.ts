import { DynamoDBStreamEvent } from 'aws-lambda';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import invariant from 'tiny-invariant';

const ddb = new DynamoDBClient({
    apiVersion: '2012-08-10',
    region: process.env.AWS_REGION,
});

const tableName = process.env.TABLE_CATEGORIES_NAME;

export const handler = async (event: DynamoDBStreamEvent) => {
    invariant(tableName, 'tableName not specified in process.env.TABLE_CATEGORIES_NAME');

    for (const todo of event.Records) {
        console.log(JSON.stringify(todo));
    }
};
