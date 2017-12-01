/**
 * Import base packages
 */
const log = require("./logger");
const db = require("./database").db;
const io = require("./socket").io;
const server = require("./server");
const array = require("../helpers/array");
const playerAmount = 2;

/**
 * Initial function
 */
function init() {
    setInterval(function () {
        const groups = createGroups(getAllOnlineAndReadyPlayers());

        processMatches(groups);
    }, 10000);

    log.info("[MATCHMAKING] Started the matchmaking service!");
}

/**
 * Get an array with all the users that are ready for a match
 *
 * @return {Array}
 */
function getAllOnlineAndReadyPlayers() {
    const allPlayers = db.getData("/users");
    let groups = [];

    for (let player = 0; player < allPlayers.length; player++) {
        if (allPlayers[player].online === true && allPlayers[player].ready === true && allPlayers[player].inMatchQueue === false) {
            groups.push(allPlayers[player]);
        }

        if ((player + 1) === allPlayers.length) {
            log.info(`[MATCHMAKING] Number of players found for matches: ${groups.length}`);
            return groups;
        }
    }
}

/**
 * Splits an array after an amount of players
 *
 * @param players
 * @return {Array}
 */
function createGroups(players) {
    if(typeof players === "undefined"){
        return [];
    }

    let groupIndex = 0;
    let playerGroups = [];
    let temp_group = [];

    for (let group = 0; group < players.length; group++) {
        temp_group.push(players[group]);
        groupIndex++;

        if (groupIndex === playerAmount) {
            playerGroups.push(temp_group);
            temp_group = [];
        }

        if ((group + 1) === players.length) {
            log.info(`[MATCHMAKING] Number of matches created: ${playerGroups.length}`);
            return playerGroups;
        }
    }

    if(players.length === 0){
        return [];
    }
}

/**
 * Process all groups into matches
 *
 * @param groups
 * @param test
 */
function processMatches(groups, test = false){
    for(let group = 0; group < groups.length; group++){
        server.requestFreeServer((matchServer) => {
            if(matchServer){
                for(let player = 0; player < groups[group].length; player++){
                    const userDataIndex = array.findIndexInData(db.getData("/users"), "steamID", groups[group][player].steamID);
                    db.push(`/users[${userDataIndex}]/inMatchQueue`, true);
                }

                server.reserveServer(matchServer.index, test);

                io.sockets.emit("match_ready", {
                    users: groups[group],
                    server: `${matchServer.server.ip}:${matchServer.server.port}`
                });
            }else{
                log.warn("[SERVERS] Full!");
            }
        });
    }
}

module.exports = {init, getAllOnlineAndReadyPlayers, createGroups, processMatches};
