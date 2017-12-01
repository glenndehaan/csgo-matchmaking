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
        server.requestFreeServer((testServer) => {
            if(testServer){
                testServer.should.be.Object();
                done();
            }
        });
    });

    it('Should reserve a server', function (done) {
        server.requestFreeServer((testServer) => {
            if(testServer){
                server.reserveServer(testServer.index, true);

                server.requestFreeServer((testServer2) => {
                    testServer2.should.be.Object();
                    done();
                });
            }
        });
    });
});
