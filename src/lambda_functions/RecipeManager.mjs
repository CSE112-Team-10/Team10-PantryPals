import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
  QueryCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

import { randomUUID } from 'crypto'; 

const client = new DynamoDBClient({region: 'us-east-2',});
const dynamo = DynamoDBDocumentClient.from(client);

const tableName = 'recipes';

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  let requestJSON;
  let putResult;
  let deleteResult;
  let queryResult;
  let updateResult;
  const headers = {
    "Content-Type": "application/json",
  };
  

  try {
    
    switch (event.routeKey) {
      
      case "POST /addRecipe":
        requestJSON = JSON.parse(event.body);
        
        
        /*Check to see if username is available*/ //idk if needed
        //queryResult = await dynamo.send(
          //new QueryCommand({
            //TableName: tableName,
            //IndexName: 'username-index', // Name of the Global Secondary Index
            //KeyConditionExpression: 'username = :usernameValue',
            //ExpressionAttributeValues: { ':usernameValue': requestJSON.username },
          //})
        //);
        
        //if (queryResult.$metadata.httpStatusCode === 200 & queryResult.Items.length > 0) {
          //body = '-1';
          //break;
        //}
        
        const recipeId = randomUUID();
        //TODO: add method to chek uniqueness of ID
        
        /*Insert new username and password*/
        putResult = await dynamo.send(
          new PutCommand({
              TableName: tableName,
              Item: {
                userId: requestJSON.userId,
                recipeId: recipeId,
                recipeTitle: requestJSON.recipeTitle,
                recipeText: requestJSON.recipeText,
                mealType: requestJSON.mealType,
                base64Image: requestJSON.base64Image,
              },
          })
        );
        
        /*Returns the recipe's unique id if 
         *recipe created successfully
         */
        if (putResult.$metadata.httpStatusCode === 200) {
          body = recipeId;
        } else {
          body = '-1';
        }
        
        break;
        
      case "DELETE /deleteRecipe":
        requestJSON = JSON.parse(event.body);
        
        /*Delete the recipe associated with the unique id*/
        deleteResult = await dynamo.send(
          new DeleteCommand({
            TableName: tableName,
            Key: {
              recipeId: requestJSON.recipeId,
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
        
      case "POST /getRecipeList":
        requestJSON = JSON.parse(event.body);
        
        /* Given a userId, find all recipes 
         * associated with that account
         */
        queryResult = await dynamo.send(
          new QueryCommand({
            TableName: tableName,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: { ':userId': requestJSON.userId },
            ProjectionExpression: "recipeTitle",
          })
        );
        
        if (queryResult.$metadata.httpStatusCode === 200 & queryResult.Items.length > 0) {
          body = queryResult.Items;
        } else {
          body = '-1';
        }
        
        break;
        
        
      case "POST /getRecipe":
        requestJSON = JSON.parse(event.body);
        
        /* Given a recipeId, find the recipe 
         * with that ID
         */
        queryResult = await dynamo.send(
          new QueryCommand({
            TableName: tableName,
            KeyConditionExpression: 'recipeId = :recipeId',
            ExpressionAttributeValues: { ':recipeId': requestJSON.recipeId },
          })
        );
        
        if (queryResult.$metadata.httpStatusCode === 200 & queryResult.Items.length > 0 && queryResult.Items[0]['password'] === requestJSON.password) {
          body = queryResult.Items;
        } else {
          body = '-1';
        }
        
        break;
      case "POST /updateRecipe":
            requestJSON = JSON.parse(event.body);
            
            /* Given a recipeId, find the recipe 
             * with that ID
             */
            updateResult = await dynamo.send(
              new UpdateCommand({
                TableName: tableName,
                Key: {
                    recipeId: requestJSON.recipeId
                },
                UdateExpression: 'set recipeText = :recipeText',
                ExpressionAttributeValues: { ':recipeId': requestJSON.recipeId, ':recipeText': requestJSON.recipeText },
                ReturnValues: 'UPDATED_NEW'
              })
            );
            
            if (updateResult.$metadata.httpStatusCode === 200 & updateResult.Items.length > 0) {
              body = updateResult.Items;
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