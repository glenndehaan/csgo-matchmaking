/**
 * Import base packages
 */
const log = require("./modules/logger");
const database = require("./modules/database");
const socket = require("./modules/socket");
const matchmaking = require("./modules/matchmaking");

/**
 * Init the queue
 */
database.init();
socket.init();
matchmaking.init();

log.info("[SYSTEM] App running");
