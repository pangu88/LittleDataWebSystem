var db_handle = require('../../lib/db/db_handle');
var xlsx = require('node-xlsx');
var fs = require('fs');

var villeggiaturaloan_result = {};

villeggiaturaloan_result.get = function (req, res) {
    // res.render("villeggiaturaloan_result");
    var sid = req.query.sid;
    db_handle.query(`select count(*) from villeggiatura_record` 
                    + ` where username='${req.session.username}'`
                    + ` and sid='${sid}' and stat='ok'`, 
    (r1)=>{
        var cnt = 0;
        if (r1.results != null && r1.results.length > 0) {
            cnt = r1.results[0]["count(*)"];
        }
        if (cnt <= 0) {     // 说明没有找到 --> 还没有处理完
            res.render("villeggiaturaloan_result", {
                tip1: "您所需的数据还在处理中，请耐心等待：）<br />",
                tip2: `<a href="/villeggiaturaloan_result?sid=${sid}">点击此处刷新</a>`
            });
        }
        else {              // 说明找到了 --> 已经处理完了
            var sql = `
select
	a.xid,				-- 序号
	a.name,				-- 客户姓名
	a.sfzhm,			-- 身份证号码
	b.YEAR_INCOME,	-- 家庭年收入
	b.YEAR_OUTLAY,	-- 家庭年支出
	b.FMY_PRESON_NUM,		-- 家庭人数
	b.FMY_TOT_ZC,		-- 家庭总资产
	b.FMY_TOT_FZ,		-- 家庭总负债
	b.YEAR_DAILY_CK, 	-- 年日均存款
	b.YEAR_AMT, 			-- 年账户交易额度
	b.MONTH_FREQ,			-- 月账户交易频率
	b.CPGLD,					-- 产品关联度
	b.OVERDUE_COUNT,	-- 贷款逾期笔数
	b.CARD_OVERDUE,		-- 信用卡逾期月数
	b.FXYQ_CNT,				-- 付息逾期次数
	b.MARRY_STAT,			-- 婚姻状况
	b.IS_OTH_DEBT_DIS,	-- 信誉不良
	b.IS_BAST_HABIT,		-- 涉毒
	b.FMY_RELATION,			-- 家庭关系
    b.NEIGHBOR_RELATION,		-- 邻里关系
    b.GREEN_STAT,           -- 绿色经营情况
	b.CONCERN_LEVEL,		-- 村级公益
    b.IS_LAW_ABIDING,		-- 涉诉
    a.STAR_LEVEL,           -- 星级评定
	a.zhihang,		-- 支行
    a.xzc					-- 行政村（社区）
from 	
(
	select * from villeggiatura_base 
	where SSID='${sid}'
) a 
inner join 
(
	select * from villeggiatura 
	where SSID='${sid}'
) b 
on a.SSID=b.SSID AND a.sfzhm=b.sfzhm
`;
            var resList = [];
            for (var i = 0; i < 2; i ++) {  // 前面有两行空的
                resList.push([]);
            }
            // 第3行是标题的那一行
            resList.push([
                    '序号', '客户姓名', '身份证号码', '家庭年收入',
                    '家庭年支出', '家庭人数', '家庭总资产', '家庭总负债',
                    '年日均存款', '年账户交易额度', '月账户交易频率', '产品关联度',
                    '贷款逾期笔数', '信用卡逾期月数', '付息逾期次数', '婚姻状况',
                    '信誉不良', '涉毒', '家庭关系', '邻里关系','绿色经营情况',
                    '村级公益', '涉诉', '星级评定', '支行', '行政村（社区）'
                ]);

            db_handle.query(sql, (r2)=>{
                var results = r2.results;
                results = results.sort((a,b)=>{
                    return a.xid - b.xid;
                });
                for (var i = 0; i < results.length; i ++) {
                    var r = results[i];
                    resList.push([
                        r.xid,
                        r.name,
                        r.sfzhm,
                        r.YEAR_INCOME,
                        r.YEAR_OUTLAY,
                        r.FMY_PRESON_NUM,
                        r.FMY_TOT_ZC,
                        r.FMY_TOT_FZ,
                        r.YEAR_DAILY_CK,
                        r.YEAR_AMT,
                        r.MONTH_FREQ,
                        r.CPGLD,
                        r.OVERDUE_COUNT,
                        r.CARD_OVERDUE,
                        r.FXYQ_CNT,
                        r.MARRY_STAT,
                        r.IS_OTH_DEBT_DIS,
                        r.IS_BAST_HABIT,
                        r.FMY_RELATION,
                        r.NEIGHBOR_RELATION,
                        r.GREEN_STAT,
                        r.CONCERN_LEVEL,
                        r.IS_LAW_ABIDING,
                        r.STAR_LEVEL,
                        r.zhihang,
                        r.xzc
                    ]);
                }
                var outFileName = `${sid}_` + parseInt(Math.random()*1e8) + `.xlsx`;
                var fileOutputPath = `${__dirname}/../../public/upload_files/${outFileName}`;
                console.log("out file path = " + fileOutputPath);
                var buffer = xlsx.build([{
                    name: "sheet1",
                    data: resList
                }]);
                fs.writeFile(fileOutputPath, buffer, (err3)=>{
                    if (err3) {
                        console.log(err3);
                    }
                    res.render("villeggiaturaloan_result", {
                        tip1: "您要的数据已经生成，请尽快下载（下载链接将在生成后的10分钟内失效）",
                        tip2: `<a href="/upload_files/${outFileName}" download="两山乡居贷授信测算${sid}.xlsx">点击此处进行下载</a>`
                    });
                });
                setTimeout(()=>{
                    fs.unlinkSync(fileOutputPath);
                }, 1000*60*10);
            }, (err2)=>{
                res.render("villeggiaturaloan_result", {
                    tip1: "发生错误：<br />" + err2,
                    tip2: `<a href="/villeggiaturaloan_result?sid=${sid}">点击此处刷新</a>`
                });
            });
        }
    }, (err1)=>{
        res.render("villeggiaturaloan_result", {
            tip1: "发生错误：<br />" + err1,
            tip2: `<a href="/villeggiaturaloan_result?sid=${sid}">点击此处刷新</a>`
        });
    });
}

villeggiaturaloan_result.post = function (req, res) {

}

module.exports = villeggiaturaloan_result;