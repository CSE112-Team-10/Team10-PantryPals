import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

import { randomUUID } from 'crypto'; 

const client = new DynamoDBClient({region: 'us-east-2',});
const dynamo = DynamoDBDocumentClient.from(client);

const tableName = 'Account';

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  let requestJSON;
  let putResult;
  let deleteResult;
  let queryResult;
  const headers = {
    "Content-Type": "application/json",
  };
  

  try {
    
    switch (event.routeKey) {
      
      case "POST /addUser":
        requestJSON = JSON.parse(event.body);
        
        /*Check to see if username is available*/
        queryResult = await dynamo.send(
          new QueryCommand({
            TableName: tableName,
            IndexName: 'username-index', // Name of the Global Secondary Index
            KeyConditionExpression: 'username = :usernameValue',
            ExpressionAttributeValues: { ':usernameValue': requestJSON.username },
          })
        );
        
        if (queryResult.$metadata.httpStatusCode === 200 & queryResult.Items.length > 0) {
          body = '-1';
          break;
        }
        
        const uniqueId = randomUUID();
        /*Insert new username and password*/
        putResult = await dynamo.send(
          new PutCommand({
              TableName: tableName,
              Item: {
                id: uniqueId,
                username: requestJSON.username,
                password: requestJSON.password,
              },
          })
        );
        
        /*Returns the user;s unique id if 
         *user account created successfully
         */
        if (putResult.$metadata.httpStatusCode === 200) {
          body = uniqueId;
        } else {
          body = '-1';
        }
        
        break;
        
      case "DELETE /deleteUser":
        requestJSON = JSON.parse(event.body);
        
        /*Delete the account associated with the unique id*/
        deleteResult = await dynamo.send(
          new DeleteCommand({
            TableName: tableName,
            Key: {
              id: requestJSON.id,
            },
          })
        );
        
        /*Returns 1 if deleted successfully*/
        if (deleteResult.$metadata.httpStatusCode === 200) {
          body = '1';
        } else {
          body = '-1';
        }
        
        break;
        
      case "GET /getUserId":
        requestJSON = JSON.parse(event.body);
        
        /*Given a username and password, find the 
         *unique id associated with that account
         */
        queryResult = await dynamo.send(
          new QueryCommand({
            TableName: tableName,
            IndexName: 'username-index', // Name of the Global Secondary Index
            KeyConditionExpression: 'username = :usernameValue',
            ExpressionAttributeValues: { ':usernameValue': requestJSON.username },
            ProjectionExpression: "id, password",
          })
        );
        
        if (queryResult.$metadata.httpStatusCode === 200 & queryResult.Items.length > 0 && queryResult.Items[0]['password'] === requestJSON.password) {
          body = queryResult.Items[0]['id'];
        } else {
          body = '-1';
        }
        
        break;
        
      case "GET /verify":
        requestJSON = JSON.parse(event.body);
        
        /*Given the username and password, query the password
         *from the data base check if it matches the given.
         */
         queryResult = await dynamo.send(
          new QueryCommand({
            TableName: tableName,
            IndexName: 'username-index', // Name of the Global Secondary Index
            KeyConditionExpression: 'username = :usernameValue',
            ExpressionAttributeValues: { ':usernameValue': requestJSON.username },
            ProjectionExpression: "password",
          })
        );
        
        if (queryResult.$metadata.httpStatusCode === 200 & queryResult.Items.length > 0 && queryResult.Items[0]['password'] === requestJSON.password) {
          body = '1';
        } else {
          body = '-1';
        }
        
        break;
        
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
    
  } catch (err) {
    
    statusCode = 400;
    body = err.message;
    
  } finally {
    
    body = JSON.stringify(body);
    
  }

  return {
    statusCode,
    body,
    headers,
  };
  
};
