var formidable = require('formidable');

var upload = {};

upload.get = function (req, res) {
    res.render('upload');
}

upload.post = function (req, res) {
    // if (req.session.role == 1) {    // 只有 客户经理 有上传的权限
    if (true) { // test
        var form = new formidable.IncomingForm();

        form = new formidable.IncomingForm();
        form.uploadDir = __dirname + "/../upload_files/";
        form.keepExtensions = true;
        form.maxFieldsSize = 20 * 1024 * 1024;
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.err(err);
                res.end(JSON.stringify({ result: "上传出错" }));
            }
            console.log(JSON.stringify(files));
            res.end(JSON.stringify({ result: "上传成功" }));
            
            var suffix = files.files.name.substring(files.files.name.lastIndexOf('.')+1);
            var idx = files.files.path.lastIndexOf('/');
            if (idx == -1) {
                idx = files.files.path.lastIndexOf('\\');
            }
            if (idx != -1) {
                var trueFilename = files.files.path.substring(idx+1);
                switch (suffix) {
                    case 'xls':
                    case 'xlsx':
                        break;
                    case 'html':
                        var params = {
                            jigouId: req.session.city_id,
                            guiyuanId: req.session.code,
                            filename: trueFilename
                        };
                        break;
                    default:
                        break;
                }
            }
        })
    }
    else {
        res.end(JSON.stringify({ result: "权限错误" }));
    }
};

module.exports = upload;