var date_handle = require('../../lib/date/date_handle');
var db_handle = require('../../lib/db/db_handle');
var villeggiatura_helper = require('../../models/villeggiatura_helper')

var formidable = require('formidable');

var villeggiaturaloan_upload = {};

villeggiaturaloan_upload.get = function (req, res) {

}

villeggiaturaloan_upload.post = function (req, res) {
    var form = new formidable.IncomingForm();

    form = new formidable.IncomingForm();
    form.uploadDir = __dirname + "/../../upload_files/";
    form.keepExtensions = true;
    form.maxFieldsSize = 20 * 1024 * 1024;
    form.parse(req, (err, fields, files) => {
        var dateS = fields.date;
        if (err) {
            console.error(err);
            res.render("villeggiaturaloan", {tips: "上传失败！", date: dateS})
        }
        console.log(JSON.stringify(files));
        // res.render("villeggiaturaloan", {tips: "上传成功！"});

        var suffix = files.files.name.substring(files.files.name.lastIndexOf('.') + 1);
        var idx = files.files.path.lastIndexOf('/');
        if (idx == -1) {
            idx = files.files.path.lastIndexOf('\\');
        }
        if (idx != -1) {
            var trueFilename = files.files.path.substring(idx + 1);
            if (suffix != "xls" && suffix != "xlsx") {  // 不为Excel文件，无需处理
                res.render("villeggiaturaloan", {tips: "错误的文件格式！", date: dateS});
                return; 
            }
            var sid = req.session.username + "_" 
                    + date_handle.getNowTimeString2()
                    + parseInt(Math.random()*1e8)
                    + parseInt(Math.random()*1e8);
            // console.log("sid = " + sid);
            res.render("villeggiaturaloan", {
                tips: `上传成功，点击<a href="/villeggiaturaloan_result?sid=${sid}"><B>此链接</B></a>查看取数进度`,
                date: dateS
            });
            try {
                villeggiatura_helper.handle(req.session.username, sid, dateS, files.files.path);
            } catch (err2) {
                console.error(err2);
            }
        }
    })
}

module.exports = villeggiaturaloan_upload;