import { v4 as uuidv4 } from 'uuid'

import { document } from "../utils/dynamodbClient"
import { APIGatewayProxyHandler } from "aws-lambda"

interface ICreateToDo {
  title: string
  deadline: string
}

export const handle: APIGatewayProxyHandler = async (event) => {
  const { userID } = event.pathParameters
  const { title, deadline } = JSON.parse(event.body) as ICreateToDo

  const id = String(uuidv4())
  const date = new Date(deadline)

  console.log("id -->", id)
  console.log("userID -->", userID)
  console.log("title -->", title)
  console.log("date -->", date)

  await document.put({
    TableName: "todos",
    Item: {
      id,
      user_id: userID,
      title,
      done: false,
      deadline: String(date)
    }
  }).promise()

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "ToDo Created!",
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }
}