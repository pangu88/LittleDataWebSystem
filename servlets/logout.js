var logout = {};

logout.get = function (req, res) {
    req.session.id          = null;
    req.session.username    = null;
    req.session.passwd      = null;
    req.session.role        = null;
    res.redirect("/login");
}

logout.post = function (req, res) {

}

module.exports = logout;