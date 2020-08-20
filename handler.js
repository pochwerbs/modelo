import { DynamoDB } from 'aws-sdk';
const dynamo = new DynamoDB({ region: process.env.AWS_REGION });
const mysql = require('serverless-mysql')({
  config: {
    host: process.env.DB_HOSTNAME,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
});

export const main = async () => {
  const db = await mysql.query(
    'SELECT * FROM user WHERE status = ?',
    [1]
  );

  const dyn = await dynamo.getItem({
    TableName: 'TABLE',
    Key: {
      'KEY': 'VALUE',
    },
  }).promise();

  return {
    mysql: db,
    dynamo: dyn,
  };
};
