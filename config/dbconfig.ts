import { DynamoDBClient } from "@aws-sdk/client-dynamodb"

const REGION = "us-east-1"

const ddbClient = new DynamoDBClient([{
    region: REGION,
    credentials: {
        accessKeyId: process.env.DYNAMODB_IAM_ACCESS_KEY,
        secretAccessKey: process.env.DYNAMODB_IAM_SECRET_ACCESS_KEY
    }
}])

export { ddbClient }