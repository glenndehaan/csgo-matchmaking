/**
 * Import base packages
 */
const JsonDB = require('node-json-db');
const db = new JsonDB('csgo-matchmaking', true, false);
const log = require("./logger");
const config = require("../config");

/**
 * Initial function
 */
function init(){
    /**
     * Init the DB object if we launch the app for the first time
     */
    if(Object.keys(db.getData("/")).length === 0 && db.getData("/").constructor === Object){
        db.push("/match", []);

        log.info("[DATABASE] Initialize database for the first time!");
    }

    log.info("[DATABASE] Ready!");
}

module.exports = {init, db};
