var db_handle = require('../lib/db/db_handle');
var invalidCharacterChecker = require('../lib/check/invalidCharacterChecker');

var login = {};

login.get = function (req, res) {
    if (req.session.role != null) {
        res.redirect("/home");
        return;
    }
    res.render("login", {
        layout: "null"
    });
}

login.post = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var sql = `select * from user where username='${username}' and passwd='${password}'`;
    if (invalidCharacterChecker.check(username) == false || invalidCharacterChecker.check(password) == false) {
        res.render("login", {
            layout: "null",
            tip: "用户名或密码中包含非法字符！"
        });
        return;
    }
    db_handle.query(sql, (result) => {
        var results = result.results;
        if (results.length > 0) {   // 登陆成功
            Object.keys(results[0]).forEach((key) => {
                req.session[key] = results[0][key];
                console.log(key + ": " + results[0][key]);
            });
            req.session.role = true;
            res.redirect("/home");
        }
        else {
            res.render("login", {
                layout: "null",
                tip: "用户名或密码错误"
            });
        }
    });
}

module.exports = login;