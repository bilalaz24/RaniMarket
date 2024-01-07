# Rani Market

This is an e-commerce application built with JavaScript. Vue for the frontend and NodeJS, ExpressJs for the backend. The database is MongoDB.

## SetUp

### Clone the project

### Environment Setup

#### 1. Create the file
Create a file called .env in the root of the server folder<br />
Copy everything from the .env.example file in the server folder and paste it in the new .env file and then delete .env.example

PORT=5000<br />
MONGODBURL=mongodb-uri<br />
ACCESS_TOKEN_SECRET=jwt-token

#### 2. Fill the variables

##### MONGODBURL
Sign in with mongodb<br />
Now create a project and a cluster<br />
Then connect and you will get a uri string<br />
Copy it and paste it instead of mongodb-uri<br />
change password to the password you created

##### ACCESS_TOKEN_SECRET
Here you can enter a long string (around 50 characters) of random numbers and letters<br />
This is necessary for the authentication<br />

### Installation

#### 1. Install dependencies
```bash
cd client
npm install
```
```bash
cd server
npm install
```

#### 2. Run client
```bash
cd client
npm run serve
```

### 3. Run server
```bash
cd server
npm start
```
