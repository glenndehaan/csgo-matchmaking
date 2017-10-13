const should = require('should');
const fs = require('fs');
const io = require('socket.io-client');
const log = require('../../modules/logger');
const socket = require('../../modules/socket');
const matchmaking = require('../../modules/matchmaking');
const server = require('../../modules/server');
const config = require('../../config/config');

const socketURL = `http://localhost:${config.application.port}`;

const options = {
    transports: ['websocket'],
    'force new connection': true
};

let userIndex = null;

log.setLevel('fatal');

describe("Matchmaking", function () {
    after(function (done) {
        socket.close();
        done();
    });

    it('Should contain our player', function (done) {
        const client = io.connect(socketURL, options);

        client.on('user_data', function (data) {
            userIndex = data.index;

            client.emit('user_ready', {
                index: userIndex
            });
        });

        client.on('general_update', function (data) {
            const players = matchmaking.getAllOnlineAndReadyPlayers();
            players.should.be.Array();
            players.length.should.be.greaterThan(0);

            client.disconnect();
            done();
        });

        client.emit('user_data', {
            steamID: 1234,
            name: "A test user",
            rank: "The Global Elite"
        });
    });

    it('Should create a group', function (done) {
        const client1 = io.connect(socketURL, options);
        const client2 = io.connect(socketURL, options);

        /**
         * Client 1
         */
        client1.on('user_data', function (data) {
            userIndex = data.index;

            client1.emit('user_ready', {
                index: userIndex
            });
        });

        client1.on('general_update', function (data) {});

        client1.emit('user_data', {
            steamID: 1234,
            name: "A test user",
            rank: "The Global Elite"
        });

        /**
         * Client 2
         */
        client2.on('user_data', function (data) {
            userIndex = data.index;

            client2.emit('user_ready', {
                index: userIndex
            });
        });

        client2.on('general_update', function (data) {
            const players = matchmaking.getAllOnlineAndReadyPlayers();
            const groups = matchmaking.createGroups(players);
            groups.should.be.Array();

            client1.disconnect();
            client2.disconnect();
            done();
        });

        client2.emit('user_data', {
            steamID: 12345,
            name: "A test user 2",
            rank: "The Global Elite"
        });
    });

    it('Should return a server', function (done) {
        const client1 = io.connect(socketURL, options);
        const client2 = io.connect(socketURL, options);

        /**
         * Client 1
         */
        client1.on('user_data', function (data) {
            userIndex = data.index;

            client1.emit('user_ready', {
                index: userIndex
            });
        });

        client1.on('general_update', function (data) {});

        client1.emit('user_data', {
            steamID: 1234,
            name: "A test user",
            rank: "The Global Elite"
        });

        /**
         * Client 2
         */
        client2.on('user_data', function (data) {
            userIndex = data.index;

            client2.emit('user_ready', {
                index: userIndex
            });
        });

        client2.on('general_update', function (data) {
            const players = matchmaking.getAllOnlineAndReadyPlayers();
            const groups = matchmaking.createGroups(players);
            matchmaking.processMatches(groups, true);
        });

        client2.on('match_ready', function (data) {
            data.should.be.Object();
            data.users.should.be.Array();
            data.users.length.should.be.greaterThan(0);
            data.server.should.be.String();

            client1.disconnect();
            client2.disconnect();
            done();
        });

        client2.emit('user_data', {
            steamID: 12345,
            name: "A test user 2",
            rank: "The Global Elite"
        });
    });
});
