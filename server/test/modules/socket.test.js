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

socket.init();
log.setLevel('fatal');

describe("Socket", function () {
    after(function (done) {
        socket.close();
        done();
    });

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
            data.master.should.be.type('boolean');
            data.master.should.equal(true);

            client.disconnect();
            done();
        });
    });
});
