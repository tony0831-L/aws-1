const AWS = require('aws-sdk');
let dynamodb = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event) => {
    let resData = await dynamodb.scan({TableName: 'HelloWorldDatabase'}).promise();
    const response = {
        statusCode: 200,
        body: resData
    };
    return response;
};