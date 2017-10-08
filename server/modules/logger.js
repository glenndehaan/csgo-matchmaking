/**
 * Import base packages
 */
const log = require('simple-node-logger').createSimpleLogger('./csgo-matchmaking.log');
const config = require("../config");

/**
 * Set log level from config
 */
log.setLevel(config.application.logLevel);

module.exports = log;
