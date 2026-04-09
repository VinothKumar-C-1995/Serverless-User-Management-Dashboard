# Serverless User Management Dashboard

## Tech Stack
- React
- AWS Lambda
- API Gateway
- DynamoDB

## Features
- CRUD operations
- Serverless backend


Here is your FULL END-TO-END PROJECT (Frontend + Backend + AWS + GitHub) in step-by-step format (VS Code → AWS → Deploy).
This is complete CRUD (Create, Read, Update, Delete) project.

🏆 PROJECT TITLE
Full Stack CRUD Application with AWS Lambda, API Gateway & DynamoDB

🧠 ARCHITECTURE
React (Frontend)
        ↓
API Gateway
        ↓
AWS Lambda (Backend)
        ↓
DynamoDB (Database)

📁 STEP 1 — PROJECT STRUCTURE
aws-crud-app/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   └── styles.css
│   └── package.json
│
├── backend/
│   ├── lambda_function.py
│   └── requirements.txt
│
└── README.md

⚛️ STEP 2 — FRONTEND SETUP (VS CODE)
👉 Create Project
mkdir aws-crud-app
cd aws-crud-app
npm create vite@latest frontend
cd frontend
npm install
npm install axios

📁 frontend/src/api.js
import axios from "axios";
const API_URL = "https://YOUR_API_URL/registerUser";
export const getUsers = () => axios.get(API_URL);
export const createUser = (data) => axios.post(API_URL, data);
export const updateUser = (data) => axios.put(API_URL, data);
export const deleteUser = (email) =>
  axios.delete(API_URL, { data: { email } });

📁 frontend/src/App.jsx
import { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "./api";
export default function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ email: "", password: "" });
const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };
useEffect(() => {
    loadUsers();
  }, []);
const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(form);
    loadUsers();
  };
const handleUpdate = async () => {
    await updateUser(form);
    loadUsers();
  };
const handleDelete = async (email) => {
    await deleteUser(email);
    loadUsers();
  };
return (
    <div style={{ padding: 30 }}>
      <h1>🔥 AWS CRUD Dashboard</h1>
<input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
<br /><br />
      <button onClick={handleSubmit}>Create</button>
      <button onClick={handleUpdate}>Update</button>
<h2>Users</h2>
      {users.map((u) => (
        <div key={u.email}>
          {u.email}
          <button onClick={() => handleDelete(u.email)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

▶️ RUN FRONTEND
npm run dev

☁️ STEP 3 — DYNAMODB
Go to AWS → DynamoDB
Create Table:
Table Name: Users
Partition Key: email (String)

⚡ STEP 4 — LAMBDA (FULL CRUD)
📁 backend/lambda_function.py
import json
import boto3
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Users')
def lambda_handler(event, context):
    method = event.get("requestContext", {}).get("http", {}).get("method")
# CORS
    if method == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "*"
            },
            "body": ""
        }
# GET
    if method == "GET":
        data = table.scan()
        return {
            "statusCode": 200,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps(data.get("Items", []))
        }
# POST
    if method == "POST":
        body = json.loads(event["body"])
        table.put_item(Item=body)
# PUT
    if method == "PUT":
        body = json.loads(event["body"])
        table.update_item(
            Key={"email": body["email"]},
            UpdateExpression="set password = :p",
            ExpressionAttributeValues={":p": body["password"]}
        )
# DELETE
    if method == "DELETE":
        body = json.loads(event["body"])
        table.delete_item(Key={"email": body["email"]})
return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"message": "Success"})
    }

🔐 STEP 5 — PERMISSIONS
Lambda → Permissions → Add Role
Attach:
AmazonDynamoDBFullAccess

🌐 STEP 6 — API GATEWAY
Go to AWS → API Gateway
Create HTTP API
Add Routes:
GET     /registerUser
POST    /registerUser
PUT     /registerUser
DELETE  /registerUser
Attach Lambda to all routes

Enable CORS
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS

🔗 STEP 7 — COPY API URL
Example:
https://abc.execute-api.ap-south-1.amazonaws.com/registerUser
Replace in frontend:
const API_URL = "YOUR_API_URL/registerUser";

🧪 STEP 8 — TEST
✔ Create user
✔ View users
✔ Update
✔ Delete

📁 STEP 9 — GITHUB
git init
git add .
git commit -m "AWS CRUD App"
git branch -M main
git remote add origin https://github.com/YOUR_NAME/aws-crud-app.git
git push -u origin main

📄 README.md
# AWS CRUD App
## Tech Stack
- React
- AWS Lambda
- API Gateway
- DynamoDB
## Features
- Create User
- Read Users
- Update User
- Delete User
## Run
cd frontend
npm install
npm run dev

💼 INTERVIEW EXPLANATION
“I built a full-stack serverless CRUD application using React for frontend and AWS Lambda, API Gateway, and DynamoDB for backend. The system supports real-time user management with scalable cloud architecture.”

🚀 FINAL OUTPUT
✅ Full Stack App
✅ AWS Cloud Integration
✅ CRUD Operations
✅ GitHub Ready
✅ Resume Ready

🔥 NEXT UPGRADE (IMPORTANT)
Add:
	• JWT Authentication 🔐
	• Admin Dashboard 📊
	• Deploy (Vercel + AWS) 🌍
	• Password Hashing

If you want, I will give:
👉 Next-level UI (super advanced dashboard design)
👉 JWT login system
👉 Production-level version (company-ready project)

From <https://chatgpt.com/c/69d4f305-db74-83e8-9ee1-aad5c0b22131>
<img width="925" height="5455" alt="image" src="https://github.com/user-attachments/assets/506882b7-0880-4f5f-8dbe-b61ef343d8e8" />

