/**
 * Import base packages
 */
const log = require("./modules/logger");
const database = require("./modules/database");
const socket = require("./modules/socket");

/**
 * Init the queue
 */
database.init();
socket.init();

log.info("[SYSTEM] App running");
