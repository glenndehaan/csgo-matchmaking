/**
 * Import base packages
 */
const log = require("./modules/logger");
const database = require("./modules/database");
const socket = require("./modules/socket");
const server = require("./modules/server");
const matchmaking = require("./modules/matchmaking");

/**
 * Init the modules
 */
database.init();
socket.init();
server.init();
matchmaking.init();

log.info("[SYSTEM] App running");
