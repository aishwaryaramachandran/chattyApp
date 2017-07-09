const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuid = require('uuid/v1');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Creates the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
     }
  });
};

wss.on('connection', function connection(ws, req) {
  console.log('Client connected');
// on connection, the number of users are counted
  const userCount = wss.clients.size;
  const userCountObj = {
    id: uuidv1(),
    type: 'userCountChanged',
    userCount: userCount,
  }
   //broadcasting the number of users 'online'
  wss.broadcast(JSON.stringify(userCountObj));

  ws.on('message', function incoming(message){
    console.log('message');
    const parsedMessage = JSON.parse(message);

    switch (parsedMessage.type){
      case "postMessage":
        let newMessage = {
          type: "incomingMessage",
          id: uuid(),
          username: parsedMessage.username,
          content: parsedMessage.content
        };
        // broadcasting the message posted by a user
        wss.broadcast(JSON.stringify(newMessage));
        break;
      case "postNotification":
        let newNotification = {
          type: "incomingNotification",
          id: uuid(),
          content: parsedMessage.content
        }
        //broadcasting a notification if a user changes their name
        wss.broadcast(JSON.stringify(newNotification));
        break;
      case "userCountChanged":
        const userCount = wss.clients.size;
        //broadcasting when the number of users online has changed
        wss.broadCast(userCount);
        break;

      default:
        console.log("Unrecognized message type");

    }

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});