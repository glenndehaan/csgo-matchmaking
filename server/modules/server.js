const servers = require("../config/config").servers;
const log = require("./logger");

/**
 * Init the servers
 */
function init(){
    for(let server = 0; server < servers.length; server++){
        servers[server].available = true;
    }

    log.info("[SERVERS] Init complete!");
}

/**
 * Check if we have a server available
 *
 * @return {*}
 */
function requestFreeServer(){
    for(let server = 0; server < servers.length; server++){
        if(servers[server].available === true){
            return {index: server, server: servers[server]};
        }

        if(servers.length === server){
            return false;
        }
    }

    if(servers.length < 0){
        return false;
    }
}

/**
 * Reserve the server for a match
 *
 * @param index
 * @param test
 */
function reserveServer(index, test = false){
    servers[index].available = false;

    if(!test) {
        setTimeout(function () {
            servers[index].available = true;
        }, 6600000); // 110 minutes
    }
}

module.exports = {init, requestFreeServer, reserveServer};
