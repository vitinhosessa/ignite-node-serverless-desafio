import { APIGatewayProxyHandler } from "aws-lambda"
import { document } from "../utils/dynamodbClient"


export const handle: APIGatewayProxyHandler = async (event) => {
  const { userID } = event.pathParameters
  
  console.log("userID -->", userID)

  const response = await document.scan({
    TableName: "todos",
    FilterExpression: "user_id = :user_id",
    ExpressionAttributeValues: {
      ":user_id": userID
    }
  }).promise()


  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "ToDos Encontrados!",
      user_id: userID,
      todos: response
    })
  }
}