var date_handle = require('../../lib/date/date_handle');

var villeggiaturaloan = {};

villeggiaturaloan.get = function (req, res) {
    var dateS = date_handle.getYesterdayDateString();
    res.render("villeggiaturaloan", {
        date: dateS
    });
}

villeggiaturaloan.post = function (req, res) {

}

module.exports = villeggiaturaloan;