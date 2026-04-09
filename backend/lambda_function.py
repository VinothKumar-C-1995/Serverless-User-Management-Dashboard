import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Users')

def lambda_handler(event, context):
    try:
        method = event.get("requestContext", {}).get("http", {}).get("method")

        if method == "GET":
            return {
                "statusCode": 200,
                "headers": {"Access-Control-Allow-Origin": "*"},
                "body": json.dumps(table.scan().get("Items", []))
            }

        if method == "POST":
            body = json.loads(event.get("body", "{}"))
            table.put_item(Item=body)

        if method == "PUT":
            body = json.loads(event.get("body", "{}"))
            table.update_item(
                Key={"email": body["email"]},
                UpdateExpression="set password=:p",
                ExpressionAttributeValues={":p": body["password"]}
            )

        if method == "DELETE":
            body = json.loads(event.get("body", "{}"))
            table.delete_item(Key={"email": body["email"]})

        return {
            "statusCode": 200,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"message": "Success"})
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": str(e)})
        }
