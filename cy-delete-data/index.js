const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event) => {
  let response = {
    statusCode: 200,
    body: 'Nothing done'
  }
  try {
    const result = await dynamodb
      .delete({
        TableName: 'compare-yourself',
        Key: {
          UserID: event.UserID
        }
      })
      .promise()
    response.body = result.Item
    return response
  } catch (err) {
    response = {
      statusCode: 500,
      body: err.message
    }
    return response
  }
}
