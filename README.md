# Counter-Strike Global Offensive Matchmaking

An alternative to the normal integrated matchmaking

## Structure
### Server
- NodeJS
- ES6
- Simple Node Logger
- JsonDB
- Socket.io
- pkg

### Client
- NodeJS
- ES6
- Simple Node Logger
- Socket.io client
- pkg

### Test
- NodeJS
- ES6
- Mocha

## Basic Usage
- Install NodeJS 8.0 or higher
- For both server and client copy the `config.example.js` to `config.js` and change the vars to your needs
- cd into the server folder and run `npm start`
- cd into the client folder and run `npm start`
- That's it. You should see the client connect to the server.

## Build
- Install NodeJS 8.0 or higher
- cd into the server folder run `npm install` and `npm run build`
- cd into the client folder run `npm install` and `npm run build`
- The compiled files are in `server/build` and `client/build`

## Test
- Install NodeJS 8.0 or higher
- cd into the server folder run `npm install` and `npm run test`

## Logging
All logs will be written to the `csgo-matchmaking.log` file in the node folder.

To increase the logging change the logLevel in the config.js file from info to debug.

## Database
To make this as simple as it is I use a local Json database.

Checkout `csgo-matchmaking.json` since this is the db file.

## Inspiration
Socket.IO Client for Client backend: https://github.com/socketio/socket.io-client
Automated testing for Server and Client: https://mochajs.org/
Testing Socket.IO in Mocka example:

- http://liamkaufman.com/blog/2012/01/28/testing-socketio-with-mocha-should-and-socketio-client/
- https://github.com/liamks/Testing-Socket.IO/blob/master/test/test-chat-server.js

Client CSGO integration: https://github.com/joshuaferrara/node-csgo

## License

MIT
