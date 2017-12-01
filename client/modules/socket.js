const io = require('socket.io-client');
const log = require("./logger");
const config = require("../config/config");
let client = null;
let userIndex = null;

const options = {
    transports: ['websocket'],
    'force new connection': true
};

/**
 * Init the socket connection
 */
function init(userData, callback) {
    /**
     * Create new client connector
     */
    client = io.connect(`http://${config.application.host}:${config.application.port}`, options);

    /**
     * Triggered when successful connected to socket server
     */
    client.on('connect', function () {
        log.info(`[SOCKET] Connection ready!`);
    });

    /**
     * Triggered when connection isn't created or lost
     */
    client.on('connect_error', function () {
        log.fatal(`[SOCKET] Connection failed!`);

        setTimeout(function () {
            process.exit(1);
        }, 500)
    });

    /**
     * Triggered when socket fails
     */
    client.on('error', function () {
        log.fatal(`[SOCKET] Connection failed!`);

        setTimeout(function () {
            process.exit(1);
        }, 500)
    });

    /**
     * Check's if server is the master server else stop process
     */
    client.on('init', function (data) {
        if (data.master) {
            log.info(`[SOCKET] Master server connected!`);

            client.emit('user_data', userData);
        } else {
            process.exit(1);
        }
    });

    client.on('user_data', function (data) {
        userIndex = data.index;
        callback();
    });

    client.on('general_update', function (data) {

    });

    client.on('match_ready', function (data) {
        for (let currentUser = 0; currentUser < data.users.length; currentUser++) {
            if (data.users[currentUser].steamID === userData.steamID) {
                log.info(`[MATCHMAKING] Your match is ready!`);
                log.info(`[MATCHMAKING] Connect to the following server: ${data.server}`);

                client.disconnect();
            }
        }
    });
}

/**
 * Function called when user is ready
 */
function client_ready(){
    client.emit('user_ready', {
        index: userIndex
    });
}

/**
 * Function called when user isn't ready
 */
function client_not_ready(){
    client.emit('user_not_ready', {
        index: userIndex
    });
}

module.exports = {client, init, client_ready, client_not_ready};
