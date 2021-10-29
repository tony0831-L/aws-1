// Include the AWS SDK module
const AWS = require('aws-sdk');
// Instantiate a DynamoDB document client with the SDK
let dynamodb = new AWS.DynamoDB.DocumentClient();
// Use built-in module to get current date & time
let date = new Date();
// Store date and time in human-readable format in a variable
let now = date.toISOString();
// Define handler function, the entry point to our code for the Lambda service
// We receive the object that triggers the function as a parameter
exports.handler = async (event) => {
    // Extract values from event and format as strings
    let name = (event.firstName + event.lastName)
    // Create JSON object with parameters for DynamoDB and store in a variable
    let params = {
        TableName: 'HelloWorldDatabase',
        Item: {
            'id': name,
            'LatestGreetingTime': now
        }
    };
    // Using await, make sure object writes to DynamoDB table before continuing execution
    let bmi = event.weight / ((event.height / 100) * (event.height / 100))
    let resData = `${name},your bmi is ${bmi}`
    await dynamodb.put(params).promise();
    // Create a JSON object with our response and store it in a constant
    const response = {
        statusCode: 200,
        body: resData
    };
    // Return the response constant
    return response;
};