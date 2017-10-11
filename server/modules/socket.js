const app = require('http').createServer();
const io = require('socket.io')(app);
const log = require("./logger");
const database = require("./database").db;
const array = require("../helpers/array");
const config = require("../config/config");

/**
 * Init the socket connection
 */
function init() {
    io.on('connection', function (socket) {
        /**
         * Send the init function to every new socket that connects
         */
        socket.emit('init', {
            master: true
        });

        /**
         * Triggered when user sends client information
         */
        socket.on('user_data', function (data) {
            const userDataIndex = array.findIndexInData(database.getData("/users"), "steamID", data.steamID);
            const userDataObject = array.findObjectInData(database.getData("/users"), "steamID", data.steamID);

            data["online"] = true;
            data["ready"] = false;
            data["socketID"] = socket.id;

            if (userDataIndex === false) {
                database.push("/users[]", data);

                const userDataIndex = array.findIndexInData(database.getData("/users"), "steamID", data.steamID);
                const userDataObject = array.findObjectInData(database.getData("/users"), "steamID", data.steamID);

                socket.emit("user_data", {
                    index: userDataIndex,
                    data: userDataObject
                });

                log.info(`[SOCKET][${socket.id}] New steam client found! SteamID: ${data.steamID}. Adding user data to database`);
            } else {
                database.push(`/users[${userDataIndex}]`, data);

                socket.emit("user_data", {
                    index: userDataIndex,
                    data: userDataObject
                });

                log.info(`[SOCKET][${socket.id}] Returning steam client! Updating data! SteamID: ${data.steamID}`);
            }
        });

        /**
         * Send when user is ready to join a match
         */
        socket.on('user_ready', function (data) {
            database.push(`/users[${data.index}]/ready`, true);

            socket.emit('general_update', {
                ready: true
            });

            log.info(`[SOCKET][${socket.id}] Is now ready for a match`);
        });

        /**
         * Send when user isn't ready to join a match
         */
        socket.on('user_not_ready', function (data) {
            database.push(`/users[${data.index}]/ready`, false);

            socket.emit('general_update', {
                ready: false
            });

            log.info(`[SOCKET][${socket.id}] Isn't ready for a match`);
        });

        /**
         * Triggered when a socket disconnects
         */
        socket.on('disconnect', function () {
            log.info(`[SOCKET] Client disconnected! ID: ${socket.id}`);

            const userDataIndex = array.findIndexInData(database.getData("/users"), "socketID", socket.id);
            if (userDataIndex !== false) {
                database.push(`/users[${userDataIndex}]/online`, false);
                database.push(`/users[${userDataIndex}]/ready`, false);
                database.push(`/users[${userDataIndex}]/socketID`, false);
            }
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
function close() {
    app.close();
    log.info(`[SYSTEM] Socket.IO stopped`);
}

module.exports = {io, init, close};
