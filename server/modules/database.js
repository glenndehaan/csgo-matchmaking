/**
 * Import base packages
 */
const JsonDB = require('node-json-db');
const db = new JsonDB('csgo-matchmaking', true, false);
const log = require("./logger");

/**
 * Initial function
 */
function init() {
    /**
     * Init the DB object if we launch the app for the first time
     */
    if (Object.keys(db.getData("/")).length === 0 && db.getData("/").constructor === Object) {
        db.push("/match", []);
        db.push("/users", []);

        log.info("[DATABASE] Initialize database for the first time!");
    }

    /**
     * Reset the db users if we didn't had a clean exit in the last session
     */
    for(let user = 0; db.getData("/users").length < user; user++){
        db.push(`/users[${user}]/online`, false);
        db.push(`/users[${user}]/ready`, false);
        db.push(`/users[${user}]/inMatchQueue`, false);
        db.push(`/users[${user}]/socketID`, false);
    }

    log.info("[DATABASE] Ready!");
}

module.exports = {init, db};
