'use strict';

// REQUIREMENTS
const bodyParser = require('body-parser');
const server = require('express')();
const request = require('request');
const Card = require('dialogflow-fulfillment').Card;
var io = require("./io.js");

// INIT
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());

// SERVER POST ACTIONS
server.post('/answers', (request, response) => {

    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    // Run the proper function handler based on the matched Dialogflow intent name
    var intent = request.body.result.metadata.intentName;
    if (intent === "works-by") {
        showWorks(true);
    } else if (intent === "works-by - no") {
        showWorks(false);
    } else if (intent === "find-performance") {
        showPerformances();
    }
});

// LISTEN
server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});
