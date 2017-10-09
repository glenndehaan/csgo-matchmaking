const should = require('should');
const fs = require('fs');
const database = require('../../modules/database').db;

describe("Database", function () {
    it('Should exists on filesystem', function (done) {
        const file = fs.existsSync(__dirname + "/../../csgo-matchmaking.json");
        file.should.be.type('boolean');
        file.should.equal(true);

        if (file) {
            done();
        }
    });

    it('Should write to DB', function (done) {
        database.push("/test/write", true);

        const check = database.getData("/test/write");
        check.should.be.type('boolean');
        check.should.equal(true);

        done();
    });

    it('Should delete from DB', function (done) {
        database.delete("/test");

        try {
            database.getData("/test");
        } catch (e) {
            if (e) {
                done();
            }
        }
    });
});
