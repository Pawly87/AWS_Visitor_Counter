const { DynamoDBClient, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");

// Initialize DynamoDB client
const client = new DynamoDBClient({});

exports.handler = async () => {
  const TABLE_NAME = "VisitorCounter";   // Your DynamoDB table name
  const COUNTER_KEY = "visitorCount";    // Partition key value

  // Common CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  try {
    const result = await client.send(
      new UpdateItemCommand({
        TableName: TABLE_NAME,
        Key: { id: { S: COUNTER_KEY } },
        UpdateExpression: "ADD visitCount :inc",
        ExpressionAttributeValues: { ":inc": { N: "1" } },
        ReturnValues: "UPDATED_NEW"
      })
    );

    const newCount = result.Attributes?.visitCount?.N ?? 0;

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ count: Number(newCount) })
    };

  } catch (err) {
    console.error("Error incrementing visitor count:", err);

    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Failed to increment visitor count" })
    };
  }
};
