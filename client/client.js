/**
 * Import base packages
 */
const log = require("./modules/logger");
const socket = require("./modules/socket");

/**
 * Init the modules
 */
socket.init();

log.info("[SYSTEM] App running");
