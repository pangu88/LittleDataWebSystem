var date_handle = require('../../lib/date/date_handle');

var rainbowloan = {};

rainbowloan.get = function (req, res) {
    var dateS = date_handle.getYesterdayDateString();
    res.render("rainbowloan", {
        date: dateS
    });
}

rainbowloan.post = function (req, res) {

}

module.exports = rainbowloan;