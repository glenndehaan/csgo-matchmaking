const should = require('should');
const fs = require('fs');
const server = require('../../modules/server');

server.init();

describe("Server", function () {
    after(function (done) {
        server.init();
        done();
    });

    it('Should give a server', function (done) {
        const testServer = server.requestFreeServer();
        testServer.should.be.Object();
        done();
    });

    it('Should reserve a server', function (done) {
        const testServer = server.requestFreeServer();
        server.reserveServer(testServer.index, true);

        const testServer2 = server.requestFreeServer();
        testServer2.should.be.Object();

        done();
    });
});
