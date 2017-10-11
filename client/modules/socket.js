const io = require('socket.io-client');
const log = require("./logger");
const config = require("../config/config");
let client = null;

const options = {
    transports: ['websocket'],
    'force new connection': true
};

/**
 * Init the socket connection
 */
function init() {
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
        } else {
            process.exit(1);
        }
    });

    client.on('user_data', function (data) {

    });

    client.on('general_update', function (data) {

    });
}

module.exports = {client, init};
