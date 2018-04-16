var db_handle = require('../lib/db/db_handle');

var { exec } = require('child_process');

var villeggiaturaloan_pies = {};

villeggiaturaloan_pies.handle = function (username, sid, dateNum, startDt, endDt, idList) {
    var options = {
        encoding: 'utf8',
        timeout: 0,
        maxBuffer: 200 * 1024,
        killSignal: 'SIGTERM',
        cwd: null,
        env: null
    };
    var cmdS = `python ${__dirname}/villeggiaturaloan.py ${sid} ${dateNum} ${startDt} ${endDt}`;
    idList.forEach((id)=>{
        cmdS += " " + id;
    });
    console.log("cmd is:\r\n" + cmdS);
    exec(cmdS, options, (error, stdout, stderr)=>{
        var stat;
        if (error) {
            console.error(error);
            stat = "error";
        }
        else {
            stat = "ok";
        }
        var sql = `insert into villeggiatura_record (username,sid,stat)`
                + ` VALUES ('${username}','${sid}','${stat}')`;
        db_handle.query(sql);
    });
}

module.exports = villeggiaturaloan_pies;
