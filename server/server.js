/**
 * Import base packages
 */
const log = require("./modules/logger");
const database = require("./modules/database");
const config = require("./config");

/**
 * Init the queue
 */
database.init();

log.info("[SYSTEM] App running");
