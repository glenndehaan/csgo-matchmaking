const should = require('should');
const fs = require('fs');
const database = require('../../modules/database');

describe("Database", function () {
    it('Database should exists on filesystem', function (done) {
        const file = fs.existsSync(__dirname + "/../../csgo-matchmaking.json");
        file.should.be.type('boolean');
        file.should.equal(true);

        if (file) {
            done();
        }
    });

    it('Write to DB', function (done) {
        database.db.push("/test/write", true);

        const check = database.db.getData("/test/write");
        check.should.be.type('boolean');
        check.should.equal(true);

        done();
    });

    it('Delete from DB', function (done) {
        database.db.delete("/test");

        try {
            database.db.getData("/test");
        } catch(e) {
            if(e){
                done();
            }
        }
    });
});
