// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');  // external modular that return a function 

// Start up an instance of app
const app = express();   // save the returned function in a variable ((app))
/* Middleware*/
//Allow for our front end part to communicate with the server
const cors = require('cros');

// enable requestes from cors
app.use(cors());

//bodyParser allow  to send data from the client to backend through json
const bodyParser=require('body-parser');
const { response } = require('express');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));

const port =4000;
const host = "127.0.0.1";

//setup server

function listening ()
{
    console.log(`Server is running at http://${host}:${port}/`);
}
app.listen(port,listening);


const getAll = (request,response) => {
    response.status(200).send(projectData).end();
    console.log("Data are all here ");
}
app.get("/all",getAll);

//complete post (add)

const data = (request,response) =>{ projectData = request.body;
                                    console.log("post all data",request.body);
                                    console.log(projectData);
                                    response.status(200).send(projectData); /* not very nessesary*/ }

app.post("/add",data);
