const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event) => {
  // TODO implement
  let response = {
    statusCode: 200,
    body: 'Wrong param especified'
  }
  const param = event.type
  if (param === 'all') {
    try {
      const result = await dynamodb
        .scan({
          TableName: 'compare-yourself'
        })
        .promise()
      response = {
        statusCode: 200,
        body: result.Items
      }
    } catch (error) {
      response = {
        statusCode: 500,
        body: error
      }
    }
    return response
  } else if (param === 'single') {
    try {
      const result = await dynamodb
        .get({
          TableName: 'compare-yourself',
          Key: {
            UserID: event.UserID
          }
        })
        .promise()
      response = {
        statusCode: 200,
        body: result.Item
      }
    } catch (error) {
      response = {
        statusCode: 500,
        body: error
      }
    }
    return response
  }
  return response
}
