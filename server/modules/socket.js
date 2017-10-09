const app = require('http').createServer();
const io = require('socket.io')(app);
const log = require("./logger");
const database = require("./database").db;
const config = require("../config/config");

/**
 * Init the socket connection
 */
function init() {
    io.on('connection', function (socket) {
        socket.emit('init', {
            master: true
        });

        socket.on('user_data', function (data) {
            database.push("/users[]", data);
        });

        socket.on('hello', function (data) {
            io.sockets.emit('world', {});
        });

        log.info(`[SOCKET] New client connected! ID: ${socket.id}`);
    });

    /**
     * Start listening on the right port/host for the Socket.IO server
     */
    app.listen(config.application.port, config.application.host);
    log.info(`[SYSTEM] Socket.IO started on: ${config.application.host}:${config.application.port}`);
}

/**
 * Shutdown the Socket.IO server (mainly used for the automated tests)
 */
function close(){
    app.close();
    log.info(`[SYSTEM] Socket.IO stopped`);
}

module.exports = {io, init, close};
