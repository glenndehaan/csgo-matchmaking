const should = require('should');
const fs = require('fs');
const io = require('socket.io-client');
const log = require('../../modules/logger');
const socket = require('../../modules/socket');
const config = require('../../config/config');

const socketURL = `http://localhost:${config.application.port}`;

const options = {
    transports: ['websocket'],
    'force new connection': true
};

let userIndex = null;

socket.init();
log.setLevel('fatal');

describe("Socket", function () {
    it('Should connect to Socket.IO server', function (done) {
        const client = io.connect(socketURL, options);

        client.on('connect', function () {
            client.disconnect();
            done();
        });
    });

    it('Should receive connect init data', function (done) {
        const client = io.connect(socketURL, options);

        client.on('init', function (data) {
            data.master.should.be.Boolean();
            data.master.should.equal(true);

            client.disconnect();
            done();
        });
    });

    it('Should receive index and user data', function (done) {
        const client = io.connect(socketURL, options);

        client.on('user_data', function (data) {
            data.index.should.be.Number();
            data.data.should.be.Object();

            userIndex = data.index;

            client.disconnect();
            done();
        });

        client.emit('user_data', {
            steamID: 1234,
            name: "A test user",
            rank: "The Global Elite"
        });
    });

    it('Should receive update (step 1, ready)', function (done) {
        const client = io.connect(socketURL, options);

        client.on('general_update', function (data) {
            data.ready.should.be.Boolean();
            data.ready.should.equal(true);

            client.disconnect();
            done();
        });

        client.emit('user_ready', {
            index: userIndex
        });
    });

    it('Should receive update (step 2, not ready)', function (done) {
        const client = io.connect(socketURL, options);

        client.on('general_update', function (data) {
            data.ready.should.be.Boolean();
            data.ready.should.equal(false);

            client.disconnect();
            done();
        });

        client.emit('user_not_ready', {
            index: userIndex
        });
    });
});
