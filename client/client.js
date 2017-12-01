/**
 * Import base packages
 */
const readline = require('readline');
const { createSteamId } = require("./modules/utils");
const log = require("./modules/logger");
const socket = require("./modules/socket");

/**
 * Set global vars
 */
const clientDetails = {
    steamID: createSteamId(),
    name: "xxxxx",
    rank: "xxxxx"
};
let userReady = false;

/**
 * Init the modules
 */
socket.init(clientDetails, () => {
    /**
     * Add keypress events
     */
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (str, key) => {
        if (key.ctrl && key.name === 'c') {
            /**
             * Always exit
             */
            process.exit();
        }

        /**
         * User ready button
         */
        if(key.name === "f6") {
            if(!userReady) {
                socket.client_ready();
                userReady = true;

                log.info("[MATCHMAKING] Searching for matches!");
            } else {
                socket.client_not_ready();
                userReady = false;

                log.info("[MATCHMAKING] Search for matches! Canceled...");
            }
        }
    });

    log.info("[SYSTEM] When you are ready for matchmaking press F6. Press it again to stop searching...");
});

log.info("[SYSTEM] App running");
