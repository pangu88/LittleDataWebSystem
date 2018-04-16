var date_handle = require('../../lib/date/date_handle');

var whitetealoan = {};

whitetealoan.get = function (req, res) {
    var dateS = date_handle.getYesterdayDateString();
    res.render("whitetealoan", {
        date: dateS
    });
}

whitetealoan.post = function (req, res) {

}

module.exports = whitetealoan;