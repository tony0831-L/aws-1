const AWS = require('aws-sdk');
let dynamodb = new AWS.DynamoDB.DocumentClient();
let date = new Date();
let now = date.toISOString();
exports.handler = async (event) => {
    let resData;
    switch (event.methods) {
        case 'get':
            resData = await dynamodb.scan({TableName: 'HelloWorldDatabase'}).promise();
            break;
    
        case 'post':
            let name = (event.firstName + event.lastName)
            let params = {
                TableName: 'HelloWorldDatabase',
                Item: {
                    'id': name,
                    'LatestGreetingTime': now
                }
            };
            resData = event.weight / ((event.height / 100) * (event.height / 100))
            await dynamodb.put(params).promise();
            break;

        case 'del':
            resData = await dynamodb.delete({TableName: 'HelloWorldDatabase',Key: {id: event.item}}).promise();
            break;
    }
    const response = {
        statusCode: 200,
        body: resData
    };
    return response;
};