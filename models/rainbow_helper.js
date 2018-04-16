var db_handle = require('../lib/db/db_handle');
var rainbowloan_pies = require('../pies/rainbowloan_pies');
var xlsx = require('node-xlsx');

var rainbow_helper = {};

rainbow_helper.handle = function (username, sid, dateS, filepath) {
    console.log("username = " + username);
    console.log("sid = " + sid);
    console.log("dateS = " + dateS);
    console.log("filepath = " + filepath);

    var dateNum;
    try {
        dateNum = parseInt(dateS);
    } catch (err) {
        console.error(err);
        return;
    }
    var endDt = parseInt(dateNum/100) * 100 + 1;
    var startDt = endDt - 10000;
    console.log(`dt=${dateNum},sdt=${startDt},edt=${endDt}`);

    var data = xlsx.parse(filepath)[0].data;
    // console.log('data = ' + JSON.stringify(data));
    var sqlList = [];
    for (var i = 1; i < data.length; i ++) {
        var xid = data[i][0];
        var name = data[i][1];
        var sfzhm = data[i][2];
        var zhihang = data[i][3];
        var xzc = data[i][4];
        if (xid == null || name == null || sfzhm == null || zhihang == null || xzc == null) {
            continue;
        }
        var sql = `insert into rainbow_base (SSID,xid,name,sfzhm,zhihang,xzc)`
            + ` VALUES ('${sid}',${xid},'${name}','${sfzhm}','${zhihang}','${xzc}')`;
        sqlList.push(sql);
    }
    var afterHandle = function () {
        console.log("after handle..");
        idList = [];
        for (var i = 1; i < data.length; i ++) {
            var id = "101" + data[i][2];
            idList.push(id);
        }
        rainbowloan_pies.handle(username, sid, dateNum, startDt, endDt, idList);
    }
    var cnt = 0;
    sqlList.forEach((sql)=>{
        console.log(sql);
        db_handle.query(sql, (r)=>{
            cnt ++;
            if (cnt == sqlList.length) {
                afterHandle();
            }
        }, (err)=>{
            cnt ++;
            if (cnt == sqlList.length) {
                afterHandle();
            }
        });
    });
}

module.exports = rainbow_helper;