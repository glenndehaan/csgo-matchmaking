/**
 * Import base packages
 */
const log = require('simple-node-logger').createSimpleLogger();
const config = require("../config/config");

/**
 * Set log level from config
 */
log.setLevel(config.application.logLevel);

module.exports = log;
