var fs = require('fs');
var formidable = require('formidable');

var express = require('express');

// process.on('uncaughtException', function (err) {
//     console.log('Caught exception: ', err);
// });

var app = express();

// 设置log4js
var log4js = require('log4js');
log4js.configure({
    appenders: {
        console: { type: 'console' },
        file: { type: 'file', filename: 'logs/cheese.log' }
    },
    categories: {
        cheese: { appenders: ['file'], level: 'info' },
        default: { appenders: ['console'], level: 'info' }
    }
});

var logger = log4js.getLogger('cheese');
app.use(log4js.connectLogger(logger, { level: 'info' }));

// 设置handlebars视图引擎
var handlebars = require('express-handlebars')
    .create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));
app.use(require('body-parser').urlencoded({ extended: false })); // for 上传
// app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({
    secret: 'xxxxx_anbank_maillist',
    cookie: { maxAge: 6000000 }, // 100分钟
    resave: true,
    saveUninitialized: true
}));  // for session

var servlets = JSON.parse(fs.readFileSync('./config/servlets.json', 'utf8'));


Object.keys(servlets).forEach((page) => {
    var servlet = require(servlets[page]);
    app.get(page, function (req, res) {
        try {
            if (page == '/login') {
                servlet.get(req, res);
                return;
            }
            if (req.session.role == null) {
                res.redirect('login');
            } else {
                servlet.get(req, res);
            }
        } catch (error) {
            console.error(error);
        }
    });
    app.post(page, function (req, res) {
        try {
            if (page == '/login') {
                servlet.post(req, res);
                return;
            }
            if (req.session.role == null) {
                res.redirect('login');
            } else {
                servlet.post(req, res);
            }
        } catch (error) {
            console.error(error);
        }
    });
});

// 定制404页面
app.use(function (req, res) {
    if (req.session.auth == null) {
        res.redirect("/login");
        return;
    }
    res.status(404);
    res.render('404', {layout: "null"});
});

// 定制500页面
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500', {layout: "null"});
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to termanate.');
});