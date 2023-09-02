const AWS = require('aws-sdk')
const uniqid = require('uniqid')
const dynamodb = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event) => {
  try {
    const Item = {
      UserID: 'user_' + uniqid(),
      Age: event.age,
      Height: event.height,
      Income: event.income
    }
    await dynamodb
      .put({
        TableName: 'compare-yourself',
        Item
      })
      .promise()
    return Item
  } catch (err) {
    return err
  }
}
